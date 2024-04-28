import psql, { transact } from '@/lib/database';
import { InventoryItem } from '@/lib/models';
import Error from '@/lib/error';
import { aggregateInventoryItem } from '@/lib/models';

/**
 * Details an inventory item and its usage over a time interval.
 * Object does not store the time interval.
 */
export class ExcessItem {
    item: InventoryItem;
    qtyUsed: number;

    constructor(item: InventoryItem, qtyUsed: number) {
        this.item = item;
        this.qtyUsed = qtyUsed;
    }
}

/**
 * @return a list of inventory items that need restock (i.e. their current stock is less than their min stock)
 */
export async function restockReport(tsql = psql): Promise<InventoryItem[]> {
    return transact<InventoryItem[], any, undefined>(
        tsql,
        new Error('SQL Error in restock report', undefined, undefined),
        async (isql, _) => {
            let res: InventoryItem[] = [];
            for (const {
                id: id,
                name: name,
                avg_cost: avgCost,
                qty: qty,
                min_qty: minQty,
                max_qty: maxQty,
            } of await isql`SELECT * FROM inventory WHERE qty < min_qty;`) {
                res.push(
                    new InventoryItem(id, name, avgCost, qty, minQty, maxQty)
                );
            }
            return res;
        }
    );
}

/**
 * @param begin the start of the interval to check
 * @param end the end of the interval to run the statistic on. Default to current time.
 * @return a list of ExcessItem describing  those inventory items that used less than 10% of the stock between begin and end
 */
export async function excessReport(
    begin: number,
    end: number = Date.now(),
    tsql = psql
): Promise<ExcessItem[]> {
    return transact<ExcessItem[], any, { begin: number; end: number }>(
        tsql,
        new Error('SQL Error in excess Report', undefined, {
            begin: begin,
            end: end,
        }),
        async (isql, _) => {
            let res: ExcessItem[] = [];
            const qrows = await isql`
SELECT
    inventory.*,
    inter.uqty as used_qty
FROM 
    inventory,
    (
        SELECT 
            inter.cqty AS cqty,
            inter.iid AS iid,
            inter.uqty as uqty
        FROM (
            SELECT
                inventory.id as iid,
                inventory.qty as cqty,
                sum(order_items.qty) as uqty
            FROM
                inventory
            INNER JOIN ingredients
                ON inventory.id=ingredients.inventory_id
            INNER JOIN order_items
                ON order_items.item_id=ingredients.item_id
            INNER JOIN orders
                ON orders.id=order_items.order_id
            WHERE orders.timestamp >= ${begin} AND orders.timestamp < ${end}
            GROUP BY inventory.id
        ) AS inter
        WHERE uqty < cqty / 9
    ) AS inter
WHERE inter.iid=inventory.id;
            `;
            for (const {
                used_qty: usedQty,
                id: id,
                name: name,
                avg_cost: avgCost,
                qty: qty,
                min_qty: minQty,
                max_qty: maxQty,
            } of qrows) {
                res.push(
                    new ExcessItem(
                        new InventoryItem(
                            id,
                            name,
                            avgCost,
                            qty,
                            minQty,
                            maxQty
                        ),
                        usedQty
                    )
                );
            }
            return res;
        }
    );
}

/**
 * Details an inventory item's usage over a time period.
 */

/**
 * @param begin the start of the interval to check
 * @param end the end of the interval to run the statistic on.
 * @return a list of AggregateItems describing all items that were used in the time interval, and their usage amount.
 */
export async function aggregateInventory(
    start: number,
    end: number,
    tsql = psql
): Promise<aggregateInventoryItem[]> {
    return transact<
        aggregateInventoryItem[],
        any,
        { start: number; end: number }
    >(
        tsql,
        new Error('SQL Error in aggregateInventory', undefined, {
            start: start,
            end: end,
        }),
        async (isql, _) => {
            const rows = await isql`
            SELECT
                inventory.id,
                inventory.name,
                SUM(aggregate_ingredients.qty) AS qty
            FROM
                inventory,
                (
                    SELECT
                        ingredients.inventory_id,
                        (ingredients.amount * sum_items.qty) AS qty
                    FROM
                        ingredients,
                        (
                            SELECT
                                item_id,
                                SUM(qty) AS qty
                            FROM
                                order_items,
                                orders
                            WHERE
                                order_items.order_id = orders.id
                                AND orders.timestamp >= ${start}
                                AND orders.timestamp <= ${end}
                            GROUP BY item_id
                        ) AS sum_items
                    WHERE
                        ingredients.item_id = sum_items.item_id
                ) AS aggregate_ingredients
            WHERE
                inventory.id = aggregate_ingredients.inventory_id
            GROUP BY
                inventory.id;`;
            
            let res: aggregateInventoryItem[] = [];
            for (const { id: id, name: name, qty: qty } of rows) {
                res.push(new aggregateInventoryItem(id, name, qty));
            }
            return res;
        }
    );
}
