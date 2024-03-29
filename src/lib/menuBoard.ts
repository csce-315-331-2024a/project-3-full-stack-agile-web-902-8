import psql, { transact } from "@/lib/database"
import { MenuItem } from "@/lib/models";
import { Seasonal } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

export async function aggregateMenuItems(startDate: Date, endDate: Date, tsql = psql): Promise<AggregateItem[]>{
    return transact<AggregateItem[], postgres.Error, any>(tsql, new Error("SQL Error in removeFromInventory", undefined, {startDate, endDate}), async (isql, abort) => {
        const query = `
        SELECT
          mi.id,
          mi.name,
          SUM(oi.quantity) AS qty
        FROM
          menu_items mi
        JOIN
          order_items oi ON mi.id = oi.menu_item_id
        JOIN
          orders o ON oi.order_id = o.id
        WHERE
          o.timestamp >= ${startDate.toISOString()} AND
          o.timestamp <= ${endDate.toISOString()}
        GROUP BY
          mi.id;
      `;
      
      const items: AggregateItem[] = [];
      const result = await isql.any(query);
      
      for (const row of result) {
        items.push(new AggregateItem(row.id, row.name, row.qty));
      }
      
      return items;

    });
}
