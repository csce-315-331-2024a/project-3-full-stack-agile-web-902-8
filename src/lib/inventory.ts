import psql, { transact } from '@/lib/database';
import { InventoryItem } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Removes an inventory item by its name from the database.
 * @param name - The name of the inventory item to be removed.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to true if the item was successfully removed, false otherwise.
 */
export async function removeInventoryItem(
    name: string,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in removeInventoryItem', undefined, name),
        async (isql, _) => {
            const result =
                await isql`DELETE FROM inventory WHERE name = ${name}`;
            return result.length > 0;
        }
    );
}

/**
 * Checks if an item exists in the inventory by its name.
 * @param name - The name of the item to check in the inventory.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to true if the item exists, false otherwise.
 */
export async function existsInInventory(
    name: string,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in existsInInventory', undefined, name),
        async (isql, _) => {
            const result =
                await isql`SELECT FROM inventory WHERE name = ${name}`;
            return result.length > 0;
        }
    );
}

/**
 * Retrieves all inventory item names from the database.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to an array of inventory item names.
 */
export async function getAllInventoryItemNames(tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(
        tsql,
        new Error('SQL error in getAllInventoryItemNames', undefined),
        async (isql, _) => {
            const names: string[] = [];
            const result = await isql`SELECT name FROM inventory`;
            for (const row of result) {
                names.push(row.name);
            }
            return names;
        }
    );
}

/**
 * Retrieves a detailed inventory item by its name.
 * @param name - The name of the inventory item to retrieve.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to an InventoryItem object if found, null otherwise.
 */
export async function getInventoryItemByName(
    name: string,
    tsql = psql
): Promise<InventoryItem | null> {
    return transact<InventoryItem | null, postgres.Error, any>(
        tsql,
        new Error('SQL error in getInventoryItemByName', undefined, name),
        async (isql, _) => {
            const result =
                await isql`SELECT id, name, qty, avg_cost, min_qty, max_qty FROM inventory WHERE name = ${name}`;
            if (result.length > 0) {
                const item = result[0];
                return new InventoryItem(
                    item.id,
                    item.name,
                    item.avg_cost,
                    item.qty,
                    item.min_qty,
                    item.max_qty
                );
            } else {
                return null;
            }
        }
    );
}

/**
 * Adds a new inventory item or updates an existing one in the database.
 * @param item - The inventory item to add or update.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to true if the item was successfully added or updated, false otherwise.
 */
export async function addOrUpdateInventoryItem(
    item: InventoryItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in addOrUpdateInventoryItem', undefined, item),
        async (isql, _) => {
            const result =
                await isql`SELECT * FROM inventory WHERE name = ${item.name}`;
            if (result.length > 0) {
                const subResult =
                    await isql`UPDATE inventory SET qty = ${item.quantity}, avg_cost = ${item.averageCost}, min_qty = ${item.minQuantity}, max_qty = ${item.maxQuantity} WHERE name = ${item.name}`;
                return subResult.length > 0;
            } else {
                const subResult =
                    await isql`INSERT INTO inventory (name, qty, avg_cost, min_qty, max_qty) VALUES (${item.name}, ${item.quantity}, ${item.averageCost}, ${item.minQuantity}, ${item.maxQuantity})`;
                return subResult.length > 0;
            }
        }
    );
}

/**
 * Removes or decrements the amount of an ingredient from a menu item in the inventory database.
 * @param menuItemName - The name of the menu item.
 * @param inventoryName - The name of the inventory item.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to true if the ingredient was successfully removed or decremented, false otherwise.
 */
export async function removeIngredient(
    menuItemName: string,
    inventoryName: string,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in removeIngredient', undefined, {
            menuItemName,
            inventoryName,
        }),
        async (isql, _) => {
            let menuItemId = 0;
            let inventoryId = 0;
            const findMenuItemIdSQL =
                await isql`SELECT id FROM menu_items WHERE name = ${menuItemName}`;
            if (findMenuItemIdSQL.length > 0) {
                menuItemId = parseInt(findMenuItemIdSQL[0].id);
            } else {
                return false;
            }

            const findInventoryIdSQL =
                await isql`SELECT id FROM inventory WHERE name = ${inventoryName}`;
            if (findInventoryIdSQL.length > 0) {
                inventoryId = parseInt(findInventoryIdSQL[0].id);
            } else {
                return false;
            }

            const checkIngredientExistsStmt =
                await isql`SELECT EXISTS (SELECT 1 FROM ingredients WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId})`;
            if (
                checkIngredientExistsStmt.length > 0 &&
                checkIngredientExistsStmt[0].EXISTS
            ) {
                const decreaseIngredientAmountStmt =
                    await isql`UPDATE ingredients SET amount = amount - 1 WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId} AND amount > 1`;
                if (decreaseIngredientAmountStmt.length == 0) {
                    const deleteIngredientStmt =
                        await isql`DELETE FROM ingredients WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId} AND amount <= 1`;
                }
            } else {
                return false;
            }
            return true;
        }
    );
}

/**
 * Requests an increase in the quantity of an inventory item, ensuring it does not exceed the maximum allowed quantity.
 * @param inventoryName - The name of the inventory item for which the quantity is to be increased.
 * @param amount - The amount by which to increase the inventory quantity.
 * @param tsql - The object representing an existing database connection or transaction, defaulting to psql.
 * @return A promise that resolves to true if the quantity was successfully increased without exceeding the maximum, false otherwise.
 */
export async function request(
    inventoryName: string,
    amount: number,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in request', undefined, { inventoryName, amount }),
        async (isql, _) => {
            const checkQtySQL =
                await isql`SELECT qty, max_qty FROM inventory WHERE name = ${inventoryName}`;
            if (checkQtySQL.length > 0) {
                let currentQty = parseFloat(checkQtySQL[0].qty);
                let maxQty = parseFloat(checkQtySQL[0].max_qty);
                if (currentQty + amount > maxQty) {
                    return false;
                }
            } else {
                return false;
            }

            const updateQtySQL =
                await isql`UPDATE inventory SET qty = qty + ${amount} WHERE name = ${inventoryName} AND qty + ${amount} <= max_qty`;
            return updateQtySQL.length > 0;
        }
    );
}
