import psql, { transact } from '@/lib/database';
import {
    Ingredient,
    InventoryItem,
    MenuItem,
    Order,
    Seasonal,
} from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';
import { frequentlySoldPairs } from '@/lib/models';
//go back and fix the affecterows

export async function getMenuItemsInSeason(tsql = psql): Promise<MenuItem[]> {
    return transact<MenuItem[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getMenuItemsInSeason', undefined),
        async (isql, _) => {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const result = await isql`
            SELECT
                mi.id, mi.name, mi.type, mi.price, mi.net_price, mi.popularity,
                si.start_date, si.end_date, si.recurring
            FROM
                menu_items mi
                LEFT JOIN seasonal_items si ON mi.id = si.item_id AND (
                    si.start_date <= ${date}::date AND si.end_date >= ${date}::date
                    OR (si.recurring = true AND EXTRACT(MONTH FROM si.start_date) <= EXTRACT(MONTH FROM ${date}::date)
                    AND EXTRACT(MONTH FROM si.end_date) >= EXTRACT(MONTH FROM ${date}::date)
                    AND EXTRACT(DAY FROM si.start_date) <= EXTRACT(DAY FROM ${date}::date)
                    AND EXTRACT(DAY FROM si.end_date) >= EXTRACT(DAY FROM ${date}::date))
                )
            `;

            const menuItems: MenuItem[] = [];
            for (const row of result) {
                const ingredients = await getIngredientsByMenuItemId(
                    row.id,
                    isql
                );
                const seasonal = row.start_date
                    ? new Seasonal(row.start_date, row.end_date, row.recurring)
                    : null;
                menuItems.push(
                    new MenuItem(
                        row.id,
                        row.name,
                        row.type,
                        row.price,
                        row.net_price,
                        row.popularity,
                        ingredients,
                        seasonal
                    )
                );
            }
            return menuItems;
        }
    );
}

/**
 * Retrieves a menu item by its name from the database.
 *
 * @param itemName - The name of the menu item to retrieve.
 * @param tsql - The object representing an existing database connection or transaction.
 *
 * @returns A Promise resolving to a MenuItem object if found, or null if not found.
 */
export async function getMenuItemByName(
    itemName: string,
    tsql = psql
): Promise<MenuItem | null> {
    return transact<MenuItem | null, postgres.Error, any>(
        tsql,
        new Error('SQL Error in getMenuItemByName', undefined, {
            itemName: itemName,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT mi.id, mi.name, mi.type, mi.price, mi.net_price, mi.popularity, 
        si.start_date, si.end_date, si.recurring 
        FROM menu_items mi 
        LEFT JOIN seasonal_items si ON mi.id = si.item_id 
        WHERE mi.name = ${itemName}`;

            if (result.length > 0) {
                const item = result[0];
                const ingredients = await getIngredientsByMenuItemId(
                    item.id,
                    isql
                ); //gets ingredietns information
                const seasonal = new Seasonal(
                    item.start_date,
                    item.end_date,
                    item.recurring
                ); //gets seasonal information

                return new MenuItem(
                    item.id,
                    item.name,
                    item.type,
                    item.price,
                    item.net_price,
                    item.popularity,
                    ingredients,
                    seasonal
                );
            } else {
                return null;
            }
        }
    );
}

/**
 * Retrieves ingredients for a menu item specified by its ID from the database.
 *
 * @param item_id - The ID of the menu item to retrieve ingredients for.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of Ingredient objects representing the ingredients for the specified menu item.
 */
export async function getIngredientsByMenuItemId(
    item_id: number,
    tsql = psql
): Promise<Ingredient[]> {
    return transact<Ingredient[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getIngredientsByMenuItemId', undefined, {
            item_id: item_id,
        }),
        async (isql, _) => {
            const result =
                await isql`SELECT inventory_id, amount FROM ingredients WHERE item_id = ${item_id}`;

            const ingredients: Ingredient[] = [];

            //stores the inventory id and amount for each ingredient
            for (const row of result) {
                const InventoryItem = await getInventoryItemById(
                    row.inventory_id,
                    isql
                ); //content of inventory item
                ingredients.push(new Ingredient(InventoryItem, row.amount));
            }

            //return as Ingredient arr
            return ingredients;
        }
    );
}

/**
 * Retrieves an inventory item by its ID from the database.
 *
 * @param inventory_id - The ID of the inventory item to retrieve.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an InventoryItem object representing the inventory item with the specified ID.
 */
export async function getInventoryItemById(
    inventory_id: number,
    tsql = psql
): Promise<InventoryItem> {
    return transact<InventoryItem, postgres.Error, any>(
        tsql,
        new Error('SQL Error in getInventoryItemById', undefined, {
            inventory_id: inventory_id,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT id, name, avg_cost, qty, min_qty, max_qty FROM inventory WHERE id = ${inventory_id}`;

            //returns the content of inventory item by passing id
            const item = result[0];
            return new InventoryItem(
                item.id,
                item.name,
                item.avg_cost,
                item.qty,
                item.min_qty,
                item.max_qty
            );
        }
    );
}

/**
 * Adds a new menu item to the database.
 *
 * @param menuItem - The MenuItem object representing the menu item to be added.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the menu item is successfully added, false otherwise.
 */
export async function addMenuItem(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in addMenuItem', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            const result = await isql`
        INSERT INTO menu_items (name, type, price, net_price, popularity) 
        VALUES (${menuItem.name}, ${menuItem.type}, ${menuItem.price}, ${menuItem.netPrice}, ${menuItem.popularity})`;

            const addedId = result[0].id; //generates new id for menu item
            const addedMenuItem = new MenuItem(
                addedId,
                menuItem.name,
                menuItem.type,
                menuItem.price,
                menuItem.netPrice,
                menuItem.popularity,
                menuItem.ingredients,
                menuItem.seasonal
            ); //creates new menu item

            if (
                menuItem.seasonal != null &&
                !(await addSeasonalItem(addedMenuItem, tsql))
            ) {
                //if it doesnt meet conditions
                return false;
            }

            return await addIngredients(addedMenuItem, tsql);
        }
    );
}

/**
 * Adds ingredients for a menu item to the database.
 *
 * @param menuItem - The MenuItem object representing the menu item for which ingredients are to be added.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredients are successfully added, false otherwise.
 */
export async function addIngredients(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in addIngredients', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            for (const ingredient of menuItem.ingredients) {
                const inventoryId = await findInventoryIdByName(
                    ingredient.inventoryItem.name,
                    isql
                ); //if no inventory id is found
                if (inventoryId == -1) {
                    return false;
                }

                const added = await addIngredient(
                    menuItem.id,
                    inventoryId,
                    ingredient.amount,
                    isql
                ); //if add does not work
                if (!added) {
                    return false;
                }
            }
            return true;
        }
    );
}

/**
 * Finds the ID of an inventory item by its name in the database.
 *
 * @param name - The name of the inventory item to find.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to the ID of the inventory item if found, or -1 if not found.
 */
export async function findInventoryIdByName(
    name: string,
    tsql = psql
): Promise<number> {
    return transact<number, postgres.Error, any>(
        tsql,
        new Error('SQL Error in findInventoryIdByName', undefined, {
            name: name,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT id FROM inventory WHERE name = ${name}`;

            const id = result[0]?.id ?? -1; // Extract the id from the result if it exists
            return id;
        }
    );
}

/**
 * Adds an ingredient to a menu item in the database.
 *
 * @param item_id - The ID of the menu item to which the ingredient is added.
 * @param inventory_id - The ID of the inventory item being used as the ingredient.
 * @param amount - The amount of the ingredient required for the menu item.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredient is successfully added, false otherwise.
 */
export async function addIngredient(
    item_id: number,
    inventory_id: number,
    amount: number,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in addIngredient', undefined, {
            item_id: item_id,
            inventory_id: inventory_id,
            amount: amount,
        }),
        async (isql, _) => {
            const result = await isql`
        INSERT INTO ingredients (item_id, inventory_id, amount) VALUES (${item_id}, ${inventory_id}, ${amount})`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }

            return false;
        }
    );
}

/**
 * Updates a menu item in the database.
 *
 * @param menuItem - The MenuItem object representing the menu item to be updated.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the menu item is successfully updated, false otherwise.
 */
export async function updateMenuItem(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in updateMenuItem', undefined, {
            menuItem: MenuItem,
        }),
        async (isql, _) => {
            const itemId = await findMenuItemIdByName(menuItem.name, tsql); //checks if item id exists
            if (itemId == -1) {
                return false;
            }

            const result = await isql`
        UPDATE menu_items SET type = ${menuItem.type}, price = ${menuItem.price}, net_price = ${menuItem.netPrice}, popularity = ${menuItem.popularity} 
        WHERE id = ${itemId}`;

            if (result.length == 0) {
                //if no param exists
                return false;
            }

            const updatedMenuItem = new MenuItem(
                itemId,
                menuItem.name,
                menuItem.type,
                menuItem.price,
                menuItem.netPrice,
                menuItem.popularity,
                menuItem.ingredients,
                menuItem.seasonal
            ); //update content

            const seasonalItemUpdated = await updateSeasonalItem(
                updatedMenuItem,
                isql
            );
            const ingredientsUpdated = await updateIngredients(
                updatedMenuItem,
                isql
            );

            return seasonalItemUpdated && ingredientsUpdated; //if it meets requirements
        }
    );
}

/**
 * Finds the ID of a menu item by its name in the database.
 *
 * @param name - The name of the menu item to find.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to the ID of the menu item if found, or -1 if not found.
 */
export async function findMenuItemIdByName(
    name: string,
    tsql = psql
): Promise<number> {
    return transact<number, postgres.Error, any>(
        tsql,
        new Error('SQL Error in findMenuItemIdByName', undefined, {
            name: name,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT id FROM menu_items WHERE name = ${name}`;

            const id = result[0]?.id ?? -1; // Extract the id from the result if it exists
            return id;
        }
    );
}

/**
 * Updates the ingredients for a menu item in the database.
 *
 * @param menuItem - The MenuItem object representing the menu item whose ingredients are to be updated.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredients are successfully updated, false otherwise.
 */
export async function updateIngredients(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in updateIngredients', undefined, { name: name }),
        async (isql, _) => {
            const currentIngredients = await getIngredientsByMenuItemId(
                menuItem.id,
                tsql
            ); //gets all ingredients with menu item id

            for (const currentIngredient of currentIngredients) {
                //iterate through all ingredients

                let found = false;

                for (const newIngredient of menuItem.ingredients) {
                    if (
                        newIngredient.inventoryItem.name ==
                        currentIngredient.inventoryItem.name
                    ) {
                        //if inventory name matches
                        found = true;

                        if (newIngredient.amount == 0) {
                            //if there is no amount for a certain ingredient
                            if (
                                !(await deleteIngredient(
                                    menuItem.id,
                                    await findInventoryIdByName(
                                        newIngredient.inventoryItem.name,
                                        isql
                                    ),
                                    isql
                                ))
                            ) {
                                return false;
                            }
                        } else if (
                            newIngredient.amount != currentIngredient.amount
                        ) {
                            //if new amount does not match with current amount
                            if (
                                !(await updateIngredient(
                                    menuItem.id,
                                    await findInventoryIdByName(
                                        newIngredient.inventoryItem.name
                                    ),
                                    newIngredient.amount,
                                    isql
                                ))
                            ) {
                                return false;
                            }
                        }
                        break;
                    }
                }

                if (!found) {
                    if (
                        !(await deleteIngredient(
                            menuItem.id,
                            await findInventoryIdByName(
                                currentIngredient.inventoryItem.name,
                                isql
                            )
                        ))
                    ) {
                        return false;
                    }
                }
            }

            for (const newIngredient of menuItem.ingredients) {
                //if new ingredient is not in the current ingredient entries

                let found = false;

                for (const currentIngredient of currentIngredients) {
                    if (
                        newIngredient.inventoryItem.name ==
                        currentIngredient.inventoryItem.name
                    ) {
                        //if name of ingredient matches with current ingredient
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    if (
                        !(await addIngredient(
                            menuItem.id,
                            await findInventoryIdByName(
                                newIngredient.inventoryItem.name,
                                isql
                            ),
                            newIngredient.amount
                        ),
                        isql)
                    ) {
                        //if addingredient returns false
                        return false;
                    }
                }
            }
            return true;
        }
    );
}

/**
 * Deletes an ingredient associated with a menu item from the database.
 *
 * @param item_id - The ID of the menu item from which the ingredient is to be deleted.
 * @param inventory_id - The ID of the inventory item representing the ingredient to be deleted.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredient is successfully deleted, false otherwise.
 */
export async function deleteIngredient(
    item_id: number,
    inventory_id: number,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in deleteIngredient', undefined, {
            item_id: item_id,
            inventory_id: inventory_id,
        }),
        async (isql, _) => {
            const result = await isql`
        DELETE FROM ingredients WHERE item_id = ${item_id} AND inventory_id = ${inventory_id}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Updates the amount of an ingredient associated with a menu item in the database.
 *
 * @param item_id - The ID of the menu item whose ingredient amount is to be updated.
 * @param inventory_id - The ID of the inventory item representing the ingredient.
 * @param amount - The new amount of the ingredient.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredient amount is successfully updated, false otherwise.
 */
export async function updateIngredient(
    item_id: number,
    inventory_id: number,
    amount: number,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in updateIngredient', undefined, {
            item_id: item_id,
            inventory_id: inventory_id,
            amount: amount,
        }),
        async (isql, _) => {
            const result = await isql`
        UPDATE ingredients SET amount = ${amount} WHERE item_id = ${item_id} AND inventory_id = ${inventory_id}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Deletes a menu item from the database.
 *
 * @param menuItem - The MenuItem object representing the menu item to be deleted.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the menu item is successfully deleted, false otherwise.
 */
export async function deleteMenuItem(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in deleteMenuItem', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            //checks if menu item exists
            const itemId = await findMenuItemIdByName(menuItem.name, isql);
            if (itemId == -1) {
                return false;
            }

            const deletedMenuItem = new MenuItem(
                itemId,
                menuItem.name,
                menuItem.type,
                menuItem.price,
                menuItem.netPrice,
                menuItem.popularity,
                menuItem.ingredients,
                menuItem.seasonal
            ); //creates listing for deleted menu item

            const result = await isql`
        DELETE FROM menu_items WHERE id = ${itemId}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Deletes all ingredients associated with a menu item from the database.
 *
 * @param menuItem - The MenuItem object representing the menu item whose ingredients are to be deleted.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredients are successfully deleted, false otherwise.
 */
export async function deleteIngredients(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in deleteIngredients', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            const result = await isql`
        DELETE FROM ingredients WHERE item_id = ${menuItem.id}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Adds a seasonal item entry for a menu item to the database.
 *
 * @param menuItem - The MenuItem object representing the menu item for which the seasonal item entry is to be added.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the seasonal item entry is successfully added, false otherwise.
 */
export async function addSeasonalItem(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in addSeasonalItem', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            if (menuItem.seasonal == null) {
                //ignores if seasonal is null
                return false;
            }
            const result = await isql`
        INSERT INTO seasonal_items (item_id, start_date, end_date, recurring) 
        VALUES (${menuItem.id}, ${menuItem.seasonal.startDate}, ${menuItem.seasonal.endDate}, ${menuItem.seasonal.recurring})`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Updates the seasonal item entry for a menu item in the database.
 *
 * @param menuItem - The MenuItem object representing the menu item whose seasonal item entry is to be updated.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the seasonal item entry is successfully updated, false otherwise.
 */
export async function updateSeasonalItem(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in updateSeasonalItem', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT COUNT(*) FROM seasonal_items WHERE item_id = ${menuItem.id}`;
            const seasonalItemExists = result[0]?.count > 0;

            if (seasonalItemExists) {
                //if seasonalitem exists
                if (menuItem.seasonal != null) {
                    const updateQuery = await isql`
                UPDATE seasonal_items SET start_date = ${menuItem.seasonal.startDate}, end_date = ${menuItem.seasonal.endDate}, recurring = ${menuItem.seasonal.recurring} 
                WHERE item_id = ${menuItem.id}`;
                    if (updateQuery.length > 0) {
                        //if at least a parameter exists
                        return true;
                    }
                    return false;
                } else {
                    const deleteQuery = await isql`
                DELETE FROM seasonal_items WHERE item_id = ${menuItem.id}`;
                    if (deleteQuery.length > 0) {
                        //if at least a parameter exists
                        return true;
                    }
                    return false;
                }
            } else {
                if (menuItem.seasonal != null) {
                    //add seasonal item entry
                    return addSeasonalItem(menuItem, isql);
                }
                return true;
            }
        }
    );
}

/**
 * Adds a new menu item or updates an existing one in the database.
 *
 * @param menuItem - The MenuItem object representing the menu item to be added or updated.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the menu item is successfully added or updated, false otherwise.
 */
export async function addOrUpdate(
    menuItem: MenuItem,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in addOrUpdate', undefined, {
            menuItem: menuItem,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT COUNT(*) FROM menu_items WHERE name = ${menuItem.name}`;

            const itemExists = result[0]?.count > 0;

            if (itemExists) {
                //if item exists, update it
                const updateQuery = await isql`
            UPDATE menu_items SET type = ${menuItem.type}, price = ${menuItem.price}, popularity = ${menuItem.popularity} 
            WHERE name = ${menuItem.name}`;

                if (updateQuery.length > 0) {
                    //if at least a parameter exists
                    return true;
                }
                return false;
            } else {
                //if item does not exist, insert a new one
                const insertQuery = await isql`
            INSERT INTO menu_items (name, type, price, popularity) 
            VALUES (${menuItem.name}, ${menuItem.type}, ${menuItem.price}, ${menuItem.popularity})`;

                if (insertQuery.length > 0) {
                    //if at least a parameter exists
                    return true;
                }
                return false;
            }
        }
    );
}

/**
 * Retrieves all distinct menu types from the database.
 *
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of strings representing all distinct menu types.
 */
export async function getAllMenuTypes(tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getAllMenuTypes', undefined),
        async (isql, _) => {
            const result = await isql`
        SELECT DISTINCT type FROM menu_items`;
            const menuTypes: string[] = [];

            //stores the inventory id and amount for each ingredient
            for (const row of result) {
                menuTypes.push(row.type);
            }
            return menuTypes;
        }
    );
}

/**
 * Retrieves the names of all menu items from the database.
 *
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of strings representing the names of all menu items.
 */
export async function getAllMenuItemNames(tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getAllMenuItemNames', undefined),
        async (isql, _) => {
            const result = await isql`
        SELECT name FROM menu_items`;
            const menuNames: string[] = [];

            //stores the inventory id and amount for each ingredient
            for (const row of result) {
                menuNames.push(row.type);
            }
            return menuNames;
        }
    );
}

/**
 * Retrieves the names of menu items of a specific type from the database.
 *
 * @param type - The type of menu items to retrieve.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of strings representing the names of menu items of the specified type.
 */
export async function getMenuItemNamesByType(
    type: string,
    tsql = psql
): Promise<string[]> {
    return transact<string[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getMenuItemNamesByType', undefined, {
            type: type,
        }),
        async (isql, _) => {
            const result = await isql`
        SELECT name FROM menu_items WHERE type = ${type}`;
            const itemNames: string[] = [];

            //stores the inventory id and amount for each ingredient
            for (const row of result) {
                itemNames.push(row.type);
            }
            return itemNames;
        }
    );
}

/**
 * Removes a menu item from the database by its name.
 *
 * @param name - The name of the menu item to be removed.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the menu item is successfully removed, false otherwise.
 */
export async function remove(name: string, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in remove', undefined, { name: name }),
        async (isql, _) => {
            const result = await isql`
        DELETE FROM menu_items WHERE name = ${name}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Checks if a menu item with the given name exists in the database.
 *
 * @param name - The name of the menu item to check for existence.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if a menu item with the given name exists in the database, false otherwise.
 */
export async function existsInDatabase(
    name: string,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in existsInDatabase', undefined, { name: name }),
        async (isql, _) => {
            const result = await isql`
        SELECT name FROM menu_items WHERE name = ${name}`;

            if (result.length > 0) {
                //if at least a parameter exists
                return true;
            }
            return false;
        }
    );
}

/**
 * Removes specified ingredients from a menu item in the database.
 *
 * @param name - The name of the menu item from which ingredients are to be removed.
 * @param ingredientsToRemove - An array of strings representing the names of ingredients to be removed.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to true if the ingredients are successfully removed, false otherwise.
 */
export async function removeIngredients(
    name: string,
    ingredientsToRemove: string[],
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in removeIngredients', undefined, { name: name }),
        async (isql, _) => {
            if (!(await existsInDatabase(name, isql))) {
                //checks if menu item exits
                return false;
            }

            //find the menu item ID
            const findMenuItemIdSQL = await isql`
        SELECT id FROM menu_items WHERE name = ${name}`;
            const menuItemId = findMenuItemIdSQL[0]?.id;

            if (!menuItemId) {
                return false;
            }

            //find inventory item id for each ingredient
            for (const ingredientName of ingredientsToRemove) {
                const inventoryIdResult = await isql`
            SELECT id FROM inventory WHERE name = ${ingredientName}`;
                const inventoryId = inventoryIdResult[0]?.id;

                if (!inventoryId) {
                    //skip if no ingrident found
                    continue;
                }

                //checks if ingredient exists
                const existsResult = await isql`
            SELECT EXISTS (SELECT 1 FROM ingredients WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId})`;
                const exists = existsResult[0]?.exists;

                //removes ingredient amount
                if (exists) {
                    await isql`
                UPDATE ingredients SET amount = GREATEST(0, amount - 1) WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId}`;
                }
            }

            return true;
        }
    );
}

/**
 * Retrieves the names of menu items of a specific type that are currently in season from the database.
 *
 * @param type - The type of menu items to retrieve.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of strings representing the names of menu items of the specified type that are currently in season.
 */
export async function getMenuItemNamesByTypeAndInSeason(
    type: string,
    tsql = psql
): Promise<string[]> {
    return transact<string[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getMenuItemNamesByTypeAndInSeason', undefined, {
            type: type,
        }),
        async (isql, _) => {
            const result = await isql`
            SELECT name FROM menu_items WHERE type = ${type} 
            AND ((id NOT IN (SELECT item_id from seasonal_items)) 
            OR (id IN ( SELECT item_id FROM seasonal_items WHERE (NOW() 
            BETWEEN start_date AND end_date) OR (recurring = 't' 
            AND ( (EXTRACT(MONTH FROM NOW()) BETWEEN EXTRACT(MONTH FROM start_date) 
            AND EXTRACT(MONTH FROM end_date)) 
            OR (EXTRACT(MONTH FROM NOW()) = EXTRACT(MONTH FROM start_date) 
            AND EXTRACT(DAY FROM NOW()) >= EXTRACT(DAY FROM start_date)) OR (EXTRACT(MONTH FROM NOW()) = EXTRACT(MONTH FROM end_date) 
            AND EXTRACT(DAY FROM NOW()) <= EXTRACT(DAY FROM end_date)) )) ))) `;

            const itemNames: string[] = [];

            //stores name of specified type and season
            for (const row of result) {
                itemNames.push(row.name);
            }
            return itemNames;
        }
    );
}

/**
 * Retrieves pairs of frequently sold menu item names of a specific type and in season within a given time range from the database.
 *
 * @param begin - The start date of the time range.
 * @param end - The end date of the time range.
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of objects representing pairs of menu item names along with their frequency of being sold.
 */
export async function getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason(
    begin: number, // Changed to number to accept timestamps
    end: number, // Changed to number to accept timestamps
    tsql = psql
): Promise<frequentlySoldPairs[]> {
    return transact<frequentlySoldPairs[], postgres.Error, any>(
        tsql,
        new Error('SQL Error in getMenuItemNamesByTypeAndInSeason', undefined, {
            begin,
            end,
        }),
        async (isql, _) => {
            // The query now uses to_timestamp to convert milliseconds to a Postgres timestamp
            const result = await isql`
            SELECT mi1.name AS item1Name, mi2.name AS item2Name, COUNT(*) AS frequency
            FROM order_items oi1
            JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.item_id < oi2.item_id
            JOIN orders o ON oi1.order_id = o.id
            JOIN menu_items mi1 ON oi1.item_id = mi1.id
            JOIN menu_items mi2 ON oi2.item_id = mi2.id
            WHERE o.timestamp BETWEEN to_timestamp(${begin}) AND to_timestamp(${end})
            GROUP BY mi1.name, mi2.name
            ORDER BY frequency DESC`;

            const itemNames: frequentlySoldPairs[] = [];

            // Returns pairs that sell frequently
            for (const {
                name1: item1Name,
                name2: item2Name,
                frequency: frequency,
            } of result) {
                itemNames.push(
                    new frequentlySoldPairs(item1Name, item2Name, frequency)
                );
            }
            return itemNames;
        }
    );
}
