import psql, { transact } from '@/lib/database';
import { Order, OrderItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Retrieves order history from the database within a specified time range and with optional status filters.
 *
 * @param begin - The start timestamp of the time range.
 * @param end - The end timestamp of the time range (default is current timestamp).
 * @param statusFilled - Flag to filter orders with status 'FILLED' (default is true).
 * @param statusCancelled - Flag to filter orders with status 'CANCELED' (default is true).
 * @param statusPending - Flag to filter orders with status 'PENDING' (default is true).
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an order if found, or null if not.
 */
export async function orderHistory(
    begin: number,
    end: number = Date.now(),
    statusFilled: boolean = true,
    statusCancelled: boolean = true,
    statusPending: boolean = true,

    tsql = psql
): Promise<Order[]> {
    return transact<Order[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in Order Report', undefined, {
            begin: begin,
            end: end,
            statusFilled: statusFilled,
            statusCancelled: statusCancelled,
            statusPending: statusPending,
        }),
        async (isql, _) => {
            let res: Order[] = [];
            const query = await isql`
            SELECT
            o.id AS order_id,
            o.timestamp,
            o.discount,
            o.total,
            o.status,
            oi.item_id,
            oi.qty AS quantity,
            mi.name AS item_name,
            mi.type AS item_type,
            mi.description,
            mi.price,
            mi.net_price
        FROM
            orders o
        JOIN
            order_items oi ON o.id = oi.order_id
        JOIN
            menu_items mi ON oi.item_id = mi.id
        WHERE
            o.timestamp >= ${begin} 
            AND o.timestamp < ${end}
            AND (
                ${statusFilled} = TRUE AND o.status = 'FILLED'
                OR ${statusCancelled} = TRUE AND o.status = 'CANCELED'
                OR ${statusPending} = TRUE AND o.status = 'PENDING'
            )
        ORDER BY
            o.timestamp DESC;
        
      `;

            let currentOrder: Order | null = null;
            for (const row of query) {
                if (currentOrder === null || currentOrder.id !== row.order_id) {
                    if (currentOrder !== null) {
                        res.push(currentOrder);
                    }
                    currentOrder = new Order(
                        row.order_id,
                        new Date(row.timestamp - 5 * 60 * 60 * 1000),
                        row.discount,
                        row.total,
                        [],
                        row.status
                    );
                }

                currentOrder.items.push(
                    new OrderItem(row.quantity, {
                        id: row.item_id,
                        name: row.item_name,
                        type: row.item_type,
                        description: row.description,
                        price: row.price,
                        netPrice: row.net_price,
                        popularity: 0,
                        ingredients: [],
                        seasonal: null,
                        weather: '',
                    })
                );
            }

            if (currentOrder !== null) {
                res.push(currentOrder);
            }

            return res;
        }
    );
}
