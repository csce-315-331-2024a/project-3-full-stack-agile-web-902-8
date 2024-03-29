import psql, { transact } from "@/lib/database"
import { MenuItem } from "@/lib/models";
import { Seasonal } from "@/lib/models";
import Error from "@/lib/error";
import postgres from "postgres";

export async function aggregateMenuItems(startDate: Date, endDate: Date, tsql = psql): Promise<AggregateItem[]>{
    return transact<AggregateItem[], postgres.Error, any>(tsql, new Error("SQL Error in removeFromInventory", undefined, {startDate, endDate}), async (isql, abort) => {
        

    });
}
