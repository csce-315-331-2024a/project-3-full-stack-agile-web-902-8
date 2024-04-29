import psql, { transact } from '@/lib/database';
import { Order, OrderItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

export async function orderHistory(
    begin: number,
    end: number = Date.now(),
    tsql = psql
): Promise<Order[]> {
    // Subtract 5 hours (in milliseconds) from begin and end timestamps
    const beginAdjusted = begin - 5 * 60 * 60 * 1000;
    const endAdjusted = end - 5 * 60 * 60 * 1000;

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
                WHERE timestamp >= ${beginAdjusted}
                  AND timestamp <= ${endAdjusted}
                ORDER BY timestamp DESC
                ;
            `) {
                if (items && items.length > 0) {
                    res.push(
                        new Order(id, timestamp, discount, total, items, status)
                    );
                }
            }
            return res;
        }
    );
}

export async function getOrderItemsByOrderId(
    orderId: number,
    tsql = psql
): Promise<OrderItem[]> {
    return transact<OrderItem[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in Order Items Query', undefined, {
            orderId: orderId,
        }),
        async (isql, _) => {
            const result = await isql`
            SELECT 
              menu_items.name,
              order_items.qty
            FROM
              menu_items
            JOIN
              order_items ON menu_items.id = order_items.item_id
            WHERE
              order_id=${orderId};
        `;

            const orderItems: OrderItem[] = [];
            for (const row of result) {
                orderItems.push(
                    new OrderItem(row.qty, {
                        id: row.item_id,
                        name: row.name,
                        type: '',
                        description: '',
                        price: 0,
                        netPrice: 0,
                        popularity: 0,
                        ingredients:[],
                        seasonal: null,
                        weather: ' '
                    })
                );
            }

            return orderItems;
        }
    );
}
