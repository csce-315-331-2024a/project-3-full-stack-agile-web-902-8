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
                limit 15;
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
          SELECT item_id, qty
          FROM order_items
          WHERE order_id = ${orderId}
        `;

            const orderItems: OrderItem[] = [];
            for (const row of result) {
                const itemName = await getMenuItemNameByItemId(
                    row.item_id,
                    isql
                );
                orderItems.push(
                    new OrderItem(row.qty, {
                        id: row.item_id,
                        name: itemName,
                        type: '',
                        description: '',
                        price: 0,
                        netPrice: 0,
                        popularity: 0,
                        ingredients: [],
                        seasonal: null,
                        weather: ' ',
                    })
                );
            }

            return orderItems;
        }
    );
}

export async function getMenuItemNameByItemId(
    itemId: number,
    tsql = psql
): Promise<string> {
    return transact<string, postgres.Error, any>(
        tsql,
        new Error('SQL Error in Menu Item Name Query', undefined, {
            itemId: itemId,
        }),
        async (isql, _) => {
            const result = await isql`
                SELECT name
                FROM menu_items 
                WHERE id = ${itemId};
            `;
            return result[0].name;
        }
    );
}
