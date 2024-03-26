import psql, { beginOrContinue } from "@/lib/database"
import { Order } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

/**
 * @param o The order to submit to the database.
 * @return The id of the added order.
 */
export async function addOrder(o: Order, tsql = psql): Promise<number> {
    const p = new Promise((R: (v: number) => void, F: (e: Error<postgres.Error, Order>) => void) => {
        beginOrContinue<number>(tsql, async isql => {
            let [{id: id}] = await isql`INSERT INTO orders (timestamp, discount, total) VALUES (${o.timestamp}, ${o.discount}, ${o.total}) RETURNING id;`
            for (const item of o.items) {
                await isql`INSERT INTO order_items (order_id, item_id, qty) VALUES (${id}, ${item.item.id}, ${item.quantity});`
            }
            return id;
        })
        .then((id) => {R(id);})
        .catch((e) => {F(new Error("SQL Error in addOrder", e, o));});
    });
    return p;
}

/**
 * Determines if an inventory item has enough stock left to be used for something requiring amount units of inventory item with id id.
 * @param amount The amount of inventory required.
 * @param id The id of the inventory item to check.
 * @return true if and only if the stock of that item is greater than amount.
 */
export async function enoughInventory(amount: number, id: number, tsql = psql ): Promise<boolean> {
    const p = new Promise((R: (v: boolean) => void, F: (e: Error<postgres.Error>) => void) => {
        tsql`SELECT qty > ${amount} AS enough FROM inventory WHERE id = ${id}`
        .then(([{enough: b}]) => R(b))
        .catch((e) => {F(new Error("SQL Error in enoughInventory", e, {amount: amount, id: id}));});
    });
    return p;
}
