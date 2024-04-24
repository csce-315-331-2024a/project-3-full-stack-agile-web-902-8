import psql, { transact } from '@/lib/database';
import { Seasonal } from '@/lib/models';
import { AggregateItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Aggregates menu items sold within a specified time frame.
 * @param startDate The start of the time frame as a Date object.
 * @param endDate The end of the time frame as a Date object.
 * @param tsql The SQL transaction function, defaulting to psql.
 * @return A promise that resolves to an array of AggregateItems with their id, name, and quantity bought.
 */
export async function aggregateMenuItems(
  startDate: number,
  endDate: number,
  tsql = psql
): Promise<AggregateItem[]> {
  return transact<AggregateItem[], any, { startDate: number; endDate: number }>(
      tsql,
      new Error('SQL Error in aggregateMenuItems', undefined, {
          startDate,
          endDate,
      }),
      async (isql, _) => {
          const result = await isql`
              SELECT
                  mi.id AS id,
                  mi.name AS name,
                  SUM(oi.qty) AS qty
              FROM
                  menu_items mi
              JOIN
                  order_items oi ON mi.id = oi.item_id
              JOIN
                  orders o ON oi.order_id = o.id
              WHERE
                  o.timestamp >= to_timestamp(${startDate} / 1000.0)
                  AND o.timestamp <= to_timestamp(${endDate} / 1000.0)
              GROUP BY
                  mi.id;
          `;

          const items: AggregateItem[] = [];
          for (const row of result) {
              items.push(new AggregateItem(row.id, row.name, row.qty));
          }

          return items;
      }
  );
}
