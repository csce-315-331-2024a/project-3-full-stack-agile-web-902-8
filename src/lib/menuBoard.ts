import psql, { transact } from '@/lib/database';
import { Seasonal } from '@/lib/models';
import { AggregateItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Aggregates menu items sold within a specified time frames.
 * @param start The start of the time frame as a Date object.
 * @param end The end of the time frame as a Date object.
 * @param tsql The SQL transaction function, defaulting to psql.
 * @return A promise that resolves to an array of AggregateItems with their id, name, and quantity bought.
 */
export async function aggregateMenuItems(
    start: number,
    end: number,
    tsql = psql
): Promise<AggregateItem[]> {
    return transact<AggregateItem[], any, { start: number; end: number }>(
        tsql,
        new Error('SQL Error in aggregateMenuItems', undefined, {
            start: start,
            end: end,
        }),
        async (isql, _) => {
            const result = await isql`
            SELECT
                menu_items.id,
                menu_items.name,
                SUM(qty) AS qty
            FROM
                menu_items,
                order_items,
                orders
            WHERE
                menu_items.id = order_items.item_id AND
                order_items.order_id = orders.id AND
                orders.timestamp >= ${start} AND
                orders.timestamp <= ${end}
            GROUP BY
                menu_items.id;
        `;

            console.log(`Query results:`, result);

            let res: AggregateItem[] = [];
            for (const row of result) {
                const { id, name, qty } = row;
                const aggregateItem = new AggregateItem(id, name, qty);
                res.push(aggregateItem);
            }

            return res;
        }
    );
}
