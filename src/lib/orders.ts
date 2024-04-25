import psql, { transact } from '@/lib/database';
import { Order, OrderItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Retrieves all pending orders with their items. 
 * Does not retireve ingredients, popularity, or seasonality.
 * @param tsql
 * @returns
 */
export async function getPendingOrders(tsql = psql): Promise<Order[]> {
    return transact<Order[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getPendingOrders', undefined),
        async (isql, _) => {
            const orders = await isql`
                SELECT o.id, o.timestamp, o.discount, o.total, o.status,
                       i.id AS item_id, i.name AS item_name, i.type AS item_type, 
                       i.price AS item_price, oi.qty AS item_quantity
                FROM orders AS o
                JOIN order_items AS oi ON o.id = oi.order_id
                JOIN menu_items AS i ON oi.item_id = i.id
                WHERE o.status = 'PENDING'
            `;

            const orderMap = new Map<number, Order>();

            for (const row of orders) {
                let order = orderMap.get(row.id);
                if (!order) {
                    order = new Order(
                        row.id,
                        new Date(row.timestamp + 'Z'),
                        row.discount,
                        row.total,
                        [],
                        row.status
                    );
                    orderMap.set(row.id, order);
                }
                order.items.push(
                    new OrderItem(row.item_quantity, {
                        id: row.item_id,
                        name: row.item_name,
                        type: row.item_type,
                        price: row.item_price,
                        netPrice: row.item_price,
                        popularity: 0,
                        ingredients: [],
                        seasonal: null,
                    })
                );
            }

            return Array.from(orderMap.values());
        }
    );
}

/**
 * @param o The order to submit to the database.
 * @return If the order was successfully added to the database.
 */
export async function addOrder(o: Order, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, Order>(
        tsql,
        new Error('SQL Error in addOrder', undefined, o),
        async (isql, _) => {
            const orderInsertResult = await isql`
                INSERT INTO orders (timestamp, discount, total, status) 
                VALUES (${o.timestamp}, ${o.discount}, ${o.total}, ${o.status}) 
                RETURNING id;
            `;
            if (orderInsertResult.count === 0) {
                console.error('Order insert failed', o);
                throw new Error('Order insert failed', undefined, o);
            }
            const id = orderInsertResult[0].id;

            for (const item of o.items) {
                const result = await isql`
                    INSERT INTO order_items (order_id, item_id, qty) 
                    VALUES (${id}, ${item.item.id}, ${item.quantity});
                `;
                if (result.count === 0) {
                    console.error('Order item insert failed', item);
                    throw new Error('Order item insert failed', item, o);
                }
            }

            console.log('Order added: ', id);
            return true;
        }
    );
}

/**
 * Determines if an inventory item has enough stock left to be used for something requiring amount units of inventory item with id id.
 * @param amount The amount of inventory required.
 * @param id The id of the inventory item to check.
 * @return true if and only if the stock of that item is greater than amount.
 */
export async function enoughInventory(
    amount: number,
    id: number,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in enoughInventory', undefined, {
            amount: amount,
            id: id,
        }),
        async (isql, _) => {
            let [{ enough: b }] =
                await isql`SELECT qty > ${amount} AS enough FROM inventory WHERE id = ${id}`;
            return b;
        }
    );
}

/**
 * Removes all of the ingredients used in an order from the inventory.
 * @param o The order to check ingredients for.
 * @return true if there is enough inventory for the order, false otherwise.
 */
export async function removeFromInventory(
    o: Order,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, Order>(
        tsql,
        new Error('SQL Error in removeFromInventory', undefined, o),
        async (isql, abort) => {
            for (const { item: item, quantity: qty } of o.items) {
                for (const {
                    inventory_id: inventoryId,
                    amount: amount,
                } of await isql`SELECT item_id, inventory_id, amount FROM ingredients WHERE item_id = ${item.id}`) {
                    const removeAmount = amount * qty;
                    if (
                        !(await enoughInventory(
                            removeAmount,
                            inventoryId,
                            isql
                        ))
                    ) {
                        abort(false);
                    }
                    await isql`UPDATE inventory SET qty = qty - ${removeAmount} WHERE id = ${inventoryId}`;
                }
            }
            return true;
        }
    );
}
