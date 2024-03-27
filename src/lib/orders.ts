import psql, { beginOrContinue } from "@/lib/database"
import { Order } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

// Define the addOrder function
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

// Define the enoughInventory function
export async function enoughInventory(amount: number, id: number, tsql = psql ): Promise<boolean> {
    const p = new Promise((R: (v: boolean) => void, F: (e: Error<postgres.Error>) => void) => {
        tsql`SELECT qty > ${amount} AS enough FROM inventory WHERE id = ${id}`
        .then(([{enough: b}]) => R(b))
        .catch((e) => {F(new Error("SQL Error in enoughInventory", e, {amount: amount, id: id}));});
    });
    return p;
}
