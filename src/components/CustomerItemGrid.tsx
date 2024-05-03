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

/**
 * A functional component that renders a grid of menu items. If the items are being fetched, it displays a loading indicator.
 * This component is ideal for displaying items from a specific category and includes functionality for adding items to an order.
 * @param isFetchingMenuItems - Indicates if the menu items are currently being fetched.
 * @param categoryItems - The list of menu items to display.
 * @param currentOrder - The current list of order entries.
 * @param setCurrentOrder - Function to update the current order based on user interactions.
 * @return A React element representing either a loading state or a grid of menu items.
 */
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
