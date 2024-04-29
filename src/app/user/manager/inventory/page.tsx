'use client';
import InventoryAdjuster from '@/components/InventoryAdjuster';

export default function Inventory() {
    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden w-full h-full grid grid-cols-[auto_auto] grid-rows-[auto_1fr] gap-4 p-4">
            <h1 className="col-[1/2] row-[1/2] text-[4rem] font-bold relative mainHeader w-fit">
                Manage Inventory
            </h1>
            <button className="col-[2/3] row-[1/2] bg-secondary duration-200 hover:bg-secondary/50 rounded-2xl p-4 m-[0_0_auto_auto]">
                Refresh
            </button>
            <InventoryAdjuster className="col-[1/3] row-[2/3] mx-auto" />
        </main>
    );
}
