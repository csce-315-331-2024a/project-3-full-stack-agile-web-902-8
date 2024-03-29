import psql, { transact } from "@/lib/database"
import { Order } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

/**
 * @param o The order to submit to the database.
 * @return The id of the added order.
 */
export async function addOrder(o: Order, tsql = psql): Promise<number> {
    return transact<number, postgres.Error, any>(tsql, new Error("SQL Error in addOrder", undefined, o), async (isql, _) => {
        let [{ id: id }] = await isql`INSERT INTO orders (timestamp, discount, total) VALUES (${o.timestamp}, ${o.discount}, ${o.total}) RETURNING id;`
        for (const item of o.items) {
            await isql`INSERT INTO order_items (order_id, item_id, qty) VALUES (${id}, ${item.item.id}, ${item.quantity});`
        }
        return id;
    });
}

/**
 * Determines if an inventory item has enough stock left to be used for something requiring amount units of inventory item with id id.
 * @param amount The amount of inventory required.
 * @param id The id of the inventory item to check.
 * @return true if and only if the stock of that item is greater than amount.
 */
export async function enoughInventory(amount: number, id: number, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in enoughInventory", undefined, { amount: amount, id: id }), async (isql, _) => {
        let [{ enough: b }] = await isql`SELECT qty > ${amount} AS enough FROM inventory WHERE id = ${id}`;
        return b;
    });
}

/**
 * Removes all of the ingredients used in an order from the inventory.
 * @param o The order to check ingredients for.
 * @return true if there is enough inventory for the order, false otherwise.
 */

/** don't forget to document */
/* name and parameters should change, but don't edit the last parameter */
/* return type for all async functions should be Promise<ReturnType>, so the real return type for this function is boolean */
export async function removeFromInventory(o: Order, tsql = psql): Promise<boolean> {
    /* first type (generic) parameter for transact should be same as return type (assuming you return the result of transact) */
    /* second and third type parameter for transact are optional but represent inner types that throw inside func, and the context information */
    return transact<boolean, postgres.Error, Order>(tsql, new Error("SQL Error in removeFromInventory", undefined, o), async (isql, abort) => {
        for (const { item: item, quantity: qty } of o.items) {
            /* you can iterate through rows returned by an sql query using for..of */
            for (const { inventory_id: inventoryId, amount: amount }
                of await isql`SELECT item_id, inventory_id, amount FROM ingredients WHERE item_id = ${item.id}`
            ) {
                const removeAmount = amount * qty;
                if (! await enoughInventory(removeAmount, inventoryId, isql)) {
                    /* if and only if there is a logical problem with the query, call the abort handler to return without throwing an error (if there is somethign unrecoverably wrong, you can just throw instead) */
                    /* if the abort handler is called, or anything inside this function throws, the transaction will be aborted and rolled back */
                    abort(false);
                }
                await isql`UPDATE inventory SET qty = qty - ${removeAmount} WHERE id = ${inventoryId}`;
            }
        }
        /* you can still return normally inside the function, and the value will go out to transact */
        return true;
    });
}