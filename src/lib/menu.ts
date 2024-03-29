import psql, { transact } from "@/lib/database"
import { Ingredient, MenuItem, Order } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

export async function getMenuItemByName(itemName: string, tsql = psql): Promise<MenuItem> {
    return transact<MenuItem, postgres.Error, any>(tsql, new Error("SQL Error in getMenuItemByName", undefined, {itemName: itemName}), async (isql, _) => {
        let [{ itemName: Name }] = await isql`SELECT mi.id, mi.name, mi.type, mi.price, mi.net_price, mi.popularity, start_date, end_date, recurring FROM menu_items LEFT JOIN seasonal_items si ON mi.id = si.item_id WHERE mi.name = ${itemName}`;
        return Name;
    });
}

export async function getIngredientsByMenuItemId(itemID: number, tsql = psql): Promise<Ingredient> {
    return transact<Ingredient, postgres.Error, any>(tsql, new Error("SQL Error in getMenuItemByName", undefined, {itemID: itemID}), async (isql, _) => {
        let [{ ingredientName: Name }] = await isql`SELECT inventory_id, amount FROM ingredients WHERE item_id = ${itemID}`;
        return Name;
    });
}


