import psql, { transact } from "@/lib/database"
import { Ingredient, InventoryItem, MenuItem, Order, Seasonal } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";


//whenever theres a nested query, make sure to return tsql
//go back and fix the affecterows


export async function getMenuItemByName(itemName: string, tsql = psql): Promise<MenuItem | null> {
    return transact<MenuItem | null, postgres.Error, any>(tsql, new Error("SQL Error in getMenuItemByName", undefined, {itemName: itemName}), async (isql, _) => {
        const result = await isql`SELECT mi.id, mi.name, mi.type, mi.price, mi.net_price, mi.popularity, si.start_date, si.end_date, si.recurring FROM menu_items mi LEFT JOIN seasonal_items si ON mi.id = si.item_id WHERE mi.name = ${itemName}`;
        if (result.length > 0)
        {
            const item = result[0];
            const ingredients = await getIngredientsByMenuItemId(item.mi.id, tsql); //gets ingredietns information 
            const seasonal = new Seasonal(item.si.start_date, item.si.end_date, item.si.recurring); //gets seasonal information

            return new MenuItem(item.mi.id, item.mi.name, item.mi.type, item.mi.price, item.mi.net_price, item.mi.popularity, ingredients, seasonal);
        }
        else
        {
            return null;
        }      
    });
}

export async function getIngredientsByMenuItemId(item_id: number, tsql = psql): Promise<Ingredient[]> {
    return transact<Ingredient[], postgres.Error, any>(tsql, new Error("SQL Error in getIngredientsByMenuItemId", undefined, {item_id: item_id}), async (isql, _) => {
        const result = await isql`SELECT inventory_id, amount FROM ingredients WHERE item_id = ${item_id}`;

        const ingredients: Ingredient[] = [];

        //stores the inventory id and amount for each ingredient
        for (const row of result){
            const InventoryItem = await getInventoryItemById(row.inventory_id, tsql); //content of inventory item
            ingredients.push( new Ingredient(row.InventoryItem, row.amount));
        }

        //return as Ingredient arr
        return ingredients;
    });
}

export async function getInventoryItemById(inventory_id: number, tsql = psql): Promise<InventoryItem> {
    return transact<InventoryItem, postgres.Error, any>(tsql, new Error("SQL Error in getInventoryItemById", undefined, {inventory_id: inventory_id}), async (isql, _) => {
        const result = await isql`SELECT id, name, avg_cost, qty, min_qty, max_qty FROM inventory WHERE id = ${inventory_id}`;

        //returns the content of inventory item by passing id
        const item = result[0];
        return new InventoryItem(item.id, item.name, item.avg_cost, item.qty, item.min_qty, item.max_qty);

    });
}

export async function addMenuItem(menuItem: MenuItem, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in addMenuItem", undefined, {menuItem: menuItem}), async (isql, _) => {
        const result = await isql`INSERT INTO menu_items (name, type, price, net_price, popularity) VALUES (${menuItem.name}, ${menuItem.type}, ${menuItem.price}, ${menuItem.netPrice}, ${menuItem.popularity})`;

        const addedId = result[0].id;
        const addedMenuItem = new MenuItem(addedId,menuItem.name,menuItem.type,menuItem.price,menuItem.netPrice,menuItem.popularity,menuItem.ingredients,menuItem.seasonal);

        if(menuItem.seasonal != null && !addSeasonalItem(addedMenuItem)){
            return false;
        }

        return addIngredients(addedMenuItem);
    });
}

export async function addIngredients(menuItem: MenuItem, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in addIngredients", undefined, {menuItem: menuItem}), async (isql, _) => {

        for(const ingredient of menuItem.ingredients){

            const inventoryId = await findInventoryIdByName(ingredient.inventoryItem.name);
            if(inventoryId == null){
                return false;
            }

            const added = await addIngredient(menuItem.id, inventoryId, ingredient.amount);
            if(!added){
                return false
            }

        }
        return true;

    });
}

export async function findInventoryIdByName(name: string, tsql = psql): Promise<number> {
    return transact<number, postgres.Error, any>(tsql, new Error("SQL Error in findInventoryIdByName", undefined, {name: name}), async (isql, _) => {
        const result = await isql`SELECT id FROM inventory WHERE name = ${name}`;

        // Extract the id from the result if it exists
        const id = result[0]?.id ?? null;
        return id;

    });
}

export async function addIngredient(item_id: number, inventory_id: number, amount: number, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in addIngredient", undefined, {item_id: item_id, inventory_id: inventory_id, amount: amount}), async (isql, _) => {
        const result = await isql`INSERT INTO ingredients (item_id, inventory_id, amount) VALUES (${item_id}, ${inventory_id}, ${amount})`;
        return true;

    });
}

export async function updateMenuItem(menuItem: MenuItem, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in updateMenuItem", undefined, {menuItem: MenuItem}), async (isql, _) => {

        const itemId = await findMenuItemIdByName(menuItem.name);
        if(itemId == null){
            return false;
        }

        const result = await isql`UPDATE menu_items SET type = ${menuItem.type}, price = ${menuItem.price}, net_price = ${menuItem.netPrice}, popularity = ${menuItem.popularity} WHERE id = ${itemId}`;

        const updatedMenuItem = new MenuItem(itemId,menuItem.name,menuItem.type,menuItem.price,menuItem.netPrice,menuItem.popularity,menuItem.ingredients,menuItem.seasonal);
    
        const seasonalItemUpdated = await updateSeasonalItem(updatedMenuItem);
        const ingredientsUpdated = await updateIngredients(updatedMenuItem);

        return seasonalItemUpdated && ingredientsUpdated;


    });
}

export async function findMenuItemIdByName(name: string, tsql = psql): Promise<number> {
    return transact<number, postgres.Error, any>(tsql, new Error("SQL Error in findMenuItemIdByName", undefined, {name: name}), async (isql, _) => {
        const result = await isql`SELECT id FROM menu_items WHERE name = ${name}`;

        // Extract the id from the result if it exists
        const id = result[0]?.id ?? null;
        return id;
    });
}

export async function updateIngredients(menuItem: MenuItem, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in updateIngredients", undefined, {name: name}), async (isql, _) => {

        const currentIngredients = await getIngredientsByMenuItemId(menuItem.id)

        for (const currentIngredient of currentIngredients){

            let found = false;

            for (const newIngredient of menuItem.ingredients){
                if (newIngredient.inventoryItem.name == currentIngredient.inventoryItem.name){
                    found = true;

                    if(newIngredient.amount == 0){
                        if (!(await deleteIngredient(menuItem.id, await findInventoryIdByName(newIngredient.inventoryItem.name)))) {
                            return false;
                        }                    
                    } else if (newIngredient.amount != currentIngredient.amount) {

                        if (!(await updateIngredient(menuItem.id, await findInventoryIdByName(newIngredient.inventoryItem.name), newIngredient.amount))) {
                            return false;
                        }
                    }
                    break;
                }
            }

            if (!found) {
                if (!(await deleteIngredient(menuItem.id, await findInventoryIdByName(currentIngredient.inventoryItem.name)))) {
                    return false;
                }
            }

        }

        for (const newIngredient of menuItem.ingredients) {
            let found = false;

            for (const currentIngredient of currentIngredients) {
                if (newIngredient.inventoryItem.name === currentIngredient.inventoryItem.name) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                if (!(await addIngredient(menuItem.id, await findInventoryIdByName(newIngredient.inventoryItem.name), newIngredient.amount))) {
                    return false;
                }
            }
        }
        return true; 
    });
}

export async function deleteIngredient(item_id: number, inventory_id: number, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in deleteIngredient", undefined, {item_id: item_id,inventory_id: inventory_id}), async (isql, _) => {
        const result = await isql`DELETE FROM ingredients WHERE item_id = ${item_id} AND inventory_id = ${inventory_id}`;
        return true;
    });
}

export async function updateIngredient(item_id: number, inventory_id: number, amount: number, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in updateIngredient", undefined, {item_id: item_id,inventory_id: inventory_id, amount: amount}), async (isql, _) => {
        const result = await isql`UPDATE ingredients SET amount = ${amount} WHERE item_id = ${item_id} AND inventory_id = ${inventory_id}`;
        return true;
    });
}

export async function deleteMenuItem(menuItem: MenuItem , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in deleteMenuItem", undefined, {menuItem:menuItem}), async (isql, _) => {

        const itemId = await findMenuItemIdByName(menuItem.name);
        if(itemId == null){
            return false;
        }

        const deletedMenuItem = new MenuItem(itemId,menuItem.name,menuItem.type,menuItem.price,menuItem.netPrice,menuItem.popularity,menuItem.ingredients,menuItem.seasonal);

        const result = await isql`DELETE FROM menu_items WHERE id = ${itemId}`;

        return true;

    });
}

export async function deleteIngredients(menuItem: MenuItem , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in deleteIngredients", undefined, {menuItem:menuItem}), async (isql, _) => {

        const result = await isql`DELETE FROM ingredients WHERE item_id = ${menuItem.id}`;
        return true;

    });
}

export async function addSeasonalItem(menuItem: MenuItem , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in addSeasonalItem", undefined, {menuItem:menuItem}), async (isql, _) => {

        if(menuItem.seasonal == null){
            return false;
        }
        const result = await isql`INSERT INTO seasonal_items (item_id, start_date, end_date, recurring) VALUES (${menuItem.id}, ${menuItem.seasonal.startDate}, ${menuItem.seasonal.endDate}, ${menuItem.seasonal.recurring})`;
        return true;

    });
}

export async function updateSeasonalItem(menuItem: MenuItem , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in updateSeasonalItem", undefined, {menuItem:menuItem}), async (isql, _) => {

        const result = await isql`SELECT COUNT(*) FROM seasonal_items WHERE item_id = ${menuItem.id}`;
        const seasonalItemExists = result[0]?.count > 0;

        if(seasonalItemExists){
            if( menuItem.seasonal != null){
                const updateQuery = await isql`UPDATE seasonal_items SET start_date = ${menuItem.seasonal.startDate}, end_date = ${menuItem.seasonal.endDate}, recurring = ${menuItem.seasonal.recurring} WHERE item_id = ${menuItem.id}`;
                return true;
            } else{
                const deleteQuery = await isql`DELETE FROM seasonal_items WHERE item_id = ${menuItem.id}`;
                return true;
            }
        }
        else{
            if( menuItem.seasonal != null){
                return addSeasonalItem(menuItem);
            }
            return true;
        }
    });
}

export async function addOrUpdate(menuItem: MenuItem , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in addOrUpdate", undefined, {menuItem:menuItem}), async (isql, _) => {
        const result = await isql`SELECT COUNT(*) FROM menu_items WHERE name = ${menuItem.name}`;
        const itemExists = result[0]?.count > 0;

        if (itemExists) {
            const updateQuery = await isql `UPDATE menu_items SET type = ${menuItem.type}, price = ${menuItem.price}, popularity = ${menuItem.popularity} WHERE name = ${menuItem.name}`;
            return true; 
        } else {
            const insertQuery = await isql `INSERT INTO menu_items (name, type, price, popularity) VALUES (${menuItem.name}, ${menuItem.type}, ${menuItem.price}, ${menuItem.popularity})`;
            return true; 
        }

        return false;

    });
}

export async function getAllMenuTypes(tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(tsql, new Error("SQL Error in getAllMenuTypes", undefined), async (isql, _) => {

        const result = await isql`SELECT DISTINCT type FROM menu_items`;
        const menuTypes: string[] = [];

        //stores the inventory id and amount for each ingredient
        for (const row of result){
            menuTypes.push(row.type);
        }
        return menuTypes;
    });
}

export async function getAllMenuItemNames(tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(tsql, new Error("SQL Error in getAllMenuItemNames", undefined), async (isql, _) => {

        const result = await isql`SELECT name FROM menu_items`;
        const menuNames: string[] = [];

        //stores the inventory id and amount for each ingredient
        for (const row of result){
            menuNames.push(row.type);
        }
        return menuNames;
    });
}

export async function getMenuItemNamesByType(type: string, tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(tsql, new Error("SQL Error in getMenuItemNamesByType", undefined, {type:type}), async (isql, _) => {

        const result = await isql`SELECT name FROM menu_items WHERE type = ${type}`;
        const itemNames: string[] = [];

        //stores the inventory id and amount for each ingredient
        for (const row of result){
            itemNames.push(row.type);
        }
        return itemNames;
    });
}

export async function remove(name: string , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in remove", undefined, {name:name}), async (isql, _) => {
        const result = await isql`DELETE FROM menu_items WHERE name = ${name}`;
        return true;
    });
}

export async function existsInDatabase(name: string , tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in remove", undefined, {name:name}), async (isql, _) => {
        const result = await isql`SELECT name FROM menu_items WHERE name = ${name}`;
        return true;
    });
}

export async function removeIngredients(name: string, ingredientsToRemove: string[], tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(tsql, new Error("SQL Error in removeIngredients", undefined, {name:name}), async (isql, _) => {

        if(!(await existsInDatabase(name, isql))){
            return false;
        }

        const findMenuItemIdSQL = await isql`SELECT id FROM menu_items WHERE name = ${name}`;
        const menuItemId = findMenuItemIdSQL[0]?.id;

        if (!menuItemId) {
            return false;
        }

        for (const ingredientName of ingredientsToRemove) {

            const inventoryIdResult = await isql`SELECT id FROM inventory WHERE name = ${ingredientName}`
            const inventoryId = inventoryIdResult[0]?.id;
            if (!inventoryId) {
                continue;
            }

            const existsResult = await isql`SELECT EXISTS (SELECT 1 FROM ingredients WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId})`;
            const exists = existsResult[0]?.exists;
            if (exists) {
                await isql`UPDATE ingredients SET amount = GREATEST(0, amount - 1) WHERE item_id = ${menuItemId} AND inventory_id = ${inventoryId}`;
            } 
        }

        return true;
    });
}

export async function getMenuItemNamesByTypeAndInSeason(type: string, tsql = psql): Promise<string[]> {
    return transact<string[], postgres.Error, any>(tsql, new Error("SQL Error in getMenuItemNamesByTypeAndInSeason", undefined, {type:type}), async (isql, _) => {

        const result = await isql`SELECT name FROM menu_items WHERE type = ${type} AND ((id NOT IN (SELECT item_id from seasonal_items)) OR (id IN ( SELECT item_id FROM seasonal_items WHERE (NOW() BETWEEN start_date AND end_date) OR (recurring = 't' AND ( (EXTRACT(MONTH FROM NOW()) BETWEEN EXTRACT(MONTH FROM start_date) AND EXTRACT(MONTH FROM end_date)) OR (EXTRACT(MONTH FROM NOW()) = EXTRACT(MONTH FROM start_date) AND EXTRACT(DAY FROM NOW()) >= EXTRACT(DAY FROM start_date)) OR (EXTRACT(MONTH FROM NOW()) = EXTRACT(MONTH FROM end_date) AND EXTRACT(DAY FROM NOW()) <= EXTRACT(DAY FROM end_date)) )) ))) `;
        const itemNames: string[] = [];

        //stores the inventory id and amount for each ingredient
        for (const row of result){
            itemNames.push(row.type);
        }
        return itemNames;
    });
}


interface ArrayList<T> extends Array<T> {}

class Pair<T, U> {
    constructor(public first: T, public second: U) {}
}

export async function getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason(begin: Date, end: Date, tsql = psql): Promise<ArrayList<Pair<Pair<string, string>, number>>> {
  return transact<ArrayList<Pair<Pair<string, string>, number>>, postgres.Error, any>( tsql, new Error("SQL Error in getMenuItemNamesByTypeAndInSeason", undefined, { begin: begin, end: end}), async (isql, _) => {
      const result = await isql`
        SELECT mi1.name AS item1Name, mi2.name AS item2Name, COUNT(*) AS frequency
        FROM order_items oi1
        JOIN order_items oi2 ON oi1.order_id = oi2.order_id AND oi1.item_id < oi2.item_id
        JOIN orders o ON oi1.order_id = o.id
        JOIN menu_items mi1 ON oi1.item_id = mi1.id
        JOIN menu_items mi2 ON oi2.item_id = mi2.id
        WHERE o.timestamp BETWEEN ${begin} AND ${end}
        GROUP BY mi1.name, mi2.name
        ORDER BY frequency DESC`;

      const itemNames: ArrayList<Pair<Pair<string, string>, number>> = [];
      for (const row of result) {
        itemNames.push(new Pair(new Pair(row.item1Name, row.item2Name), row.frequency));
      }
      return itemNames;
    }
  );
}

