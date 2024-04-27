import numpy.random as nprand
import random
from csv import DictReader
from datetime import datetime, date, timedelta
from scipy.stats import truncnorm
import os
from edit_sql import (
    write_sql_header,
    write_sql_entry,
    bulk_write_sql_entries,
    end_sql_file,
)

YEAR = 2023
YEARSPAN = 2

menu_filename = os.path.join(
    os.path.dirname(__file__), "..", "input", "insert_values", "menu_items.csv"
)
orders_filename = os.path.join(os.path.dirname(__file__), "..", "output", "orders.sql")
order_items_filename = os.path.join(
    os.path.dirname(__file__), "..", "output", "order_items.sql"
)
statistics_filename = os.path.join(
    os.path.dirname(__file__), "..", "output", "statistics.sql"
)
cumulative_items_filename = os.path.join(
    os.path.dirname(__file__), "..", "output", "cumulative_items.sql"
)

order_template = {"timestamp": None, "discount": 0.0, "total": 0.0, "status": "FILLED"}

order_items_template = {"order_id": 0, "item_id": 0, "qty": 0}

statistics_template = {"total": 0, "items": {}}


# Global definitions for generate_time
operating_hours = [10, 21]
lunch_peak = 12
dinner_peak = 19
time_stdev = 1.5  # standard deviation

a_lunch, b_lunch = (operating_hours[0] - lunch_peak) / time_stdev, (
    operating_hours[1] - lunch_peak
) / time_stdev
a_dinner, b_dinner = (operating_hours[0] - dinner_peak) / time_stdev, (
    operating_hours[1] - dinner_peak
) / time_stdev
time_weights = [0.6, 0.4]

# Global definitions for generate orders


def pick_entree(menu: list[dict]) -> dict:
    # return random entree in the menu list
    # weighed entree based on popularity column in row

    # if menu is empty, return nothing
    if not menu:
        return {}

    # declare list to stor acceptable values of type for an entree
    entree_types = {
        "Burgers",
        "Sandwiches",
        "Value Meals",
        "Baskets",
        "Limited Time Offers",
    }

    # make a new list that only contains the entrees from the menu
    entree_menu = [item for item in menu if item.get("type") in entree_types]

    # calculate list for popularity weights by getting 'popularity' column for each entry
    popularities = [float(item.get("popularity")) for item in entree_menu]

    # return the random menu item while accounting for weights using random.choices
    # k = 1 signifys one item and [0] accesses this one item
    return random.choices(entree_menu, weights=popularities, k=1)[0]


def pick_drink(menu: list[dict]) -> dict:
    # if menu is empty, return nothing
    if not menu:
        return {}

    # declare list to stor acceptable values of type for an entree
    drink_types = {"Shakes & More", "Beverages"}

    # make a new list that only contains the entrees from the menu
    drink_menu = [item for item in menu if item.get("type") in drink_types]

    # calculate list for popularity weights by getting 'popularity' column for each entry
    popularities = [float(item.get("popularity")) for item in drink_menu]

    # return the random menu item while accounting for weights using random.choices
    # k = 1 signifys one item and [0] accesses this one item
    return random.choices(drink_menu, weights=popularities, k=1)[0]


def is_discount() -> bool:
    # return true if there's a discount avg 1/40 chance
    # just a random value (0, 1) compare to 1/40 should be good

    # generate a random number between 1 and 40 inclusive
    rand_number = random.randint(1, 40)

    # check if the random number is equal to 7 (1 in 40 chance)
    return rand_number == 7


def is_peak_day(day: date) -> bool:
    # return true if it is a peak day
    # search the day before before first school day each semester
    # first day of school is aug/jan 16
    return day.day == 15 and (day.month == 8 or day.month == 1)


def generate_number_of_orders(day: date) -> int:
    # determine based on 'summer', 'typical', or 'winter break' if that day is in each those time frames
    # return number of orders based on what in plan.txt (normally distributed around some average)
    # summer: 85
    # typical: 450
    # winter break: 150
    # also double the number of orders if it's a peak day
    orders = 0
    summer_start = date(day.year, 6, 1)
    summer_end = date(day.year, 8, 15)
    winter_start_1 = date(day.year, 1, 1)
    winter_end_1 = date(day.year, 1, 15)
    winter_start_2 = date(day.year, 12, 13)
    winter_end_2 = date(day.year + 1, 1, 1)
    if summer_start < day < summer_end:
        orders = 85
    elif winter_start_1 < day < winter_end_1 or winter_start_2 < day < winter_end_2:
        orders = 150
    else:
        orders = 400
    return orders * (2 if is_peak_day(day) else 1)


def generate_order(
    order_id: int, time: datetime, menu: list[dict]
) -> tuple[dict, dict]:
    # if there's a discount randomally
    # randomly put in order based on plan.txt

    # also write the order item to the order_items with order_items.writerow(dict)
    # copy the order_items template and fill the corresponding fields then do the write

    order = order_template.copy()

    entree_probability = 0.9
    drink_probability = 0.75
    fries_probability = 0.25

    # order["id"] = order_id
    order["timestamp"] = time
    items = []  # store all the corresponding rows of menu_items in order
    item_qty = {}  # structure id: qty

    # find french fries row
    fries_row = {}
    for row in menu:
        if row["name"] == "French Fries":
            fries_row = row
            break

    # get random number of people
    num_people = int(nprand.exponential(0.5) + 1)

    for person in range(num_people):
        # randomly choose if there is entree
        if random.random() < entree_probability:
            entree = pick_entree(menu)
            items.append(entree)
            if int(entree["id"]) not in item_qty:
                item_qty[int(entree["id"])] = 1
            else:
                item_qty[int(entree["id"])] += 1

            if entree["type"] == "Baskets":
                continue

        # randomly choose if there is drink
        bought_drink = False
        if random.random() < drink_probability:
            drink = pick_drink(menu)

            items.append(drink)
            if int(drink["id"]) not in item_qty:
                item_qty[int(drink["id"])] = 1
            else:
                item_qty[int(drink["id"])] += 1

            bought_drink = True

        new_fries_probability = fries_probability
        if bought_drink:
            new_fries_probability += 0.5

        if random.random() < float(new_fries_probability):
            items.append(fries_row)
            if int(fries_row["id"]) not in item_qty:
                item_qty[int(fries_row["id"])] = 1
            else:
                item_qty[int(fries_row["id"])] += 1

    if len(items) == 0:
        return {}, {}

    # sum up the prices in the order
    order["total"] = round(sum(float(item["price"]) for item in items), 2)

    if is_discount():
        order["discount"] = round(0.1 * order["total"], 2)
        order["total"] = round(order["total"] - order["discount"], 2)

    return order, item_qty


def generate_time(day: date) -> datetime:
    # pick a time with bimodal distribution
    # lunch more popular than dinner

    # bimodal distribuion through chance of using lunch or dinner distribution
    if random.choices(population=[0, 1], weights=time_weights, k=1)[0] == 0:
        time = truncnorm.rvs(
            a_lunch, b_lunch, loc=lunch_peak, scale=time_stdev, size=1
        )[0]
    else:
        time = truncnorm.rvs(
            a_dinner, b_dinner, loc=dinner_peak, scale=time_stdev, size=1
        )[0]

    hour = int(time)
    minute = int((time - hour) * 60)
    second = int((((time - hour) * 60) - minute) * 60)
    random_datetime = datetime(day.year, day.month, day.day, hour, minute, second)

    return random_datetime


def read_menu(filename: str) -> list[dict]:
    # read from the menu file
    # list of each row
    # each row is a dict
    # just list(DictReader)

    with open(filename, "r") as infile:
        menu = list(DictReader(infile))

    return menu


def main():
    # initialize orders file with open and make it a DictWriter

    # loop throughout the days of the year
    # each day pick random number of orders
    # for each order pick a time for it
    # for each order pick what in the order
    # write that to the file

    sql_orders = []
    sql_order_items = []

    # initialize menu file
    menu = read_menu(menu_filename)

    # initialize the statistics file
    statistics_header = ["timestamp", "total"]
    write_sql_header(statistics_filename, "statistics", statistics_header)

    # initialize the cumulative items file
    cumulative_items_header = ["stat_id", "item_id", "qty"]
    write_sql_header(
        cumulative_items_filename, "cumulative_items", cumulative_items_header
    )

    # initialize dates
    start_date = date(YEAR, 1, 1)
    end_date = date(YEAR + YEARSPAN, 1, 1)
    current_date = start_date

    # storing the overall stats for each
    hour_bins = [
        statistics_template.copy()
        for _ in range(operating_hours[1] - operating_hours[0])
    ]

    # main loop
    order_id = 1
    stat_id = 1
    total_revenue = 0
    while current_date != end_date:
        # get the number of orders for today
        orders_this_day = generate_number_of_orders(current_date)

        for bin in hour_bins:
            bin["total"] = 0
            bin["items"] = {}

        # generate each order
        for order_num_this_day in range(orders_this_day):
            timestamp = generate_time(current_date)
            order, current_order_items = generate_order(order_id, timestamp, menu)

            # empty order
            if order == {}:
                continue

            # get the bin of what hour of statistics to add to
            time_bin = hour_bins[timestamp.hour - operating_hours[0]]

            sql_orders.append(order.values())
            time_bin["total"] += order["total"]

            # add items to relavent tables
            for item_id, qty in current_order_items.items():
                sql_order_items.append([order_id, item_id, qty])
                if item_id in time_bin["items"]:
                    time_bin["items"][item_id] += qty
                else:
                    time_bin["items"][item_id] = qty

            total_revenue += order["total"]
            order_id += 1

        for i, hour_bin in enumerate(hour_bins):
            # add for statistics table
            timestamp = datetime(
                current_date.year,
                current_date.month,
                current_date.day,
                i + operating_hours[0] + 1,
            )
            statistics_entry = [timestamp, round(hour_bin["total"], 2)]
            write_sql_entry(statistics_filename, statistics_entry)

            # add for cumulative items
            for item_id, qty in hour_bin["items"].items():
                items_entry = [stat_id, item_id, qty]
                write_sql_entry(cumulative_items_filename, items_entry)

            stat_id += 1

        # increment by one day
        current_date += timedelta(days=1)

        # if passed a month
        if current_date.day == 1 and current_date != end_date:
            print(
                f"After month {current_date.month - 1} year {current_date.year}, Rev's has made ${total_revenue:,.2f} with {order_id} orders made"
            )

    # final print statement
    print(
        f"From {YEAR}-{YEAR+1}, Rev's revenue was ${total_revenue:,.2f} with {order_id} orders made"
    )

    # write to orders
    orders_header = [k for k in order_template]
    write_sql_header(orders_filename, "orders", orders_header)
    bulk_write_sql_entries(orders_filename, sql_orders)
    end_sql_file(orders_filename)

    # write to order items
    order_items_header = ["order_id", "item_id", "qty"]
    write_sql_header(order_items_filename, "order_items", order_items_header)
    bulk_write_sql_entries(order_items_filename, sql_order_items)
    end_sql_file(order_items_filename)

    # end the other files
    end_sql_file(statistics_filename)
    end_sql_file(cumulative_items_filename)


if __name__ == "__main__":
    main()
