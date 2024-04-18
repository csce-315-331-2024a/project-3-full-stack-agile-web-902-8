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
                    className={
                        styles.itemButton +
                        ' ' +
                        styles.card +
                        ' ' +
                        styles.loading
                    }
                    disabled={true}
                >
                    Loading Menu Items...
                </button>
            </div>
        );
    }

    return (
        <div className={styles['menu-items']}>
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
