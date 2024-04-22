'use client';

import React from 'react';
import componentStyles from './component.module.css';
import { MenuItem } from '@/lib/models';
import { OrderEntry } from '@/app/cashier/page';

interface CashierItemGridProps {
    isFetchingMenuItems: boolean;
    categoryItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

interface CashierItemButtonProps {
    item: MenuItem;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

function CashierItemGrid({
    isFetchingMenuItems,
    categoryItems,
    currentOrder,
    setCurrentOrder,
}: CashierItemGridProps) {
    if (isFetchingMenuItems) {
        return (
            <div className={componentStyles.itemGrid}>
                <button
                    className={
                        componentStyles.itemButton +
                        ' ' +
                        componentStyles.card +
                        ' ' +
                        componentStyles.loading
                    }
                    disabled={true}
                >
                    Loading Menu Items...
                </button>
            </div>
        );
    }
    return (
        <div className={componentStyles.itemGrid}>
            {categoryItems.map((item) => (
                <CashierItemButton
                    item={item}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                    key={item.id}
                />
            ))}
        </div>
    );
}

function CashierItemButton({
    item,
    currentOrder,
    setCurrentOrder,
}: CashierItemButtonProps) {
    function handleClick() {
        const orderEntryIndex = currentOrder.findIndex(
            (orderEntry) => orderEntry.item.id === item.id
        );
        if (orderEntryIndex === -1) {
            setCurrentOrder([...currentOrder, { item: item, quantity: 1 }]);
        } else {
            setCurrentOrder(
                currentOrder.map((orderEntry) => {
                    if (orderEntry.item.id === item.id) {
                        return {
                            item: orderEntry.item,
                            quantity: orderEntry.quantity + 1,
                        };
                    }
                    return orderEntry;
                })
            );
        }
    }

    return (
        <button
            className={componentStyles.itemButton + ' ' + componentStyles.card}
            onClick={handleClick}
        >
            {item.name}
        </button>
    );
}

export default CashierItemGrid;
