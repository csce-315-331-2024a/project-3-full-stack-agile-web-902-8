'use client';

import React from 'react';
import styles from './component.module.css';
import { OrderEntry } from '@/components/CustomerOrderSidebar';
import { CustomerMenuItem } from '@/components/CustomerMenuItem';
import { MenuItem } from '@/lib/models';

interface CustomerItemGridProps {
    isFetchingMenuItems: boolean;
    categoryItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

function CustomerItemGrid({
    isFetchingMenuItems,
    categoryItems,
    currentOrder,
    setCurrentOrder,
}: CustomerItemGridProps) {
    if (isFetchingMenuItems) {
        return (
            <div>
                <button
                    className="text-background bg-text flex justify-center items-center duration-200 m-4 p-4 rounded-2xl hover:cursor-wait"
                    disabled={true}
                >
                    Loading Menu Items...
                </button>
            </div>
        );
    }

    return (
        <div className="grid w-full h-fit grid-cols-[repeat(4,1fr)] gap-2">
            {categoryItems.map((menuitem: MenuItem) => (
                <CustomerMenuItem
                    key={menuitem.id}
                    item={menuitem}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                />
            ))}
        </div>
    );
}

export default CustomerItemGrid;
