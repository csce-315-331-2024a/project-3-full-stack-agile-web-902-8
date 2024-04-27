import psql, { transact } from '@/lib/database';
import { Order, OrderItem, MenuItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

export async function orderHistory(
    begin: number,
    end: number = Date.now(),
    tsql = psql
): Promise<Order[]> {
    return transact<Order[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in Order Report', undefined, {
            begin: begin,
            end: end,
        }),
        async (isql, _) => {
            let res: Order[] = [];
            for (const {
                id,
                timestamp,
                discount,
                total,
                items = await getOrderItemsByOrderId(id, isql),
                status,
            } of await isql`
                SELECT *
                FROM Orders
                WHERE timestamp >= ${begin}
                  AND timestamp <= ${end}
                ORDER BY timestamp DESC
                LIMIT 5;
            `) {
                res.push(
                    new Order(id, timestamp, discount, total, items, status)
                );
            }
            return res;
        }
    );
}

//create a route for this function

export async function getOrderItemsByOrderId(
    orderId: number,
    tsql = psql
): Promise<OrderItem[]> {
    return transact<
    OrderItem[],
        postgres.Error,
        any
    >(
        tsql,
        new Error('SQL Error in Order Items Query', undefined, {
            orderId: orderId,
        }),
        async (isql, _) => {
            const result = await isql`
                SELECT item_id, qty
                FROM order_items
                WHERE order_id = ${orderId};
            `;
        
        const orderItems: OrderItem[] = [];
        
        for (const row of result) {
            orderItems.push(
                new OrderItem(
                    row.item.item.id,
                    row.quantity,
                )
            );
        }

        return orderItems;

        }
    );
}






// export async function getMenuItemNameByItemId(
//     itemId: number,
//     tsql = psql
// ): Promise<string[]> {
//     return transact<string[], postgres.Error, any>(
//         tsql,
//         new Error('SQL Error in Menu Item Name Query', undefined, {
//             itemId: itemId,
//         }),
//         async (isql, _) => {
//             const result = await isql`
//                 SELECT name
//                 FROM menu_items 
//                 WHERE id = ${itemId};
//             `;
//             const itemNames: string = string;

//             for (const row of result) {
//                 itemNames.push(row.type);
//             }
//             return itemNames;        }
//     );
// }
