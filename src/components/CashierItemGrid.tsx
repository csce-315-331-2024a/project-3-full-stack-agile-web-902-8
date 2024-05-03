// DONE
'use client';

import React from 'react';
import { MenuItem } from '@/lib/models';
import { OrderEntry } from '@/app/user/cashier/page';

interface CashierItemGridProps {
    isFetchingMenuItems: boolean;
    categoryItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
    className?: string;
}

interface CashierItemButtonProps {
    item: MenuItem;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
    className?: string;
}

/**
 * A functional component that renders a grid of menu items. It displays a loading state or a collection of item buttons for adding to the order.
 * @param props - Properties passed to the component as specified in CashierItemGridProps.
 * @return A React element representing either a loading state or a grid of menu items.
 */
function CashierItemGrid({
    isFetchingMenuItems,
    categoryItems,
    currentOrder,
    setCurrentOrder,
    className,
}: CashierItemGridProps) {
    if (isFetchingMenuItems) {
        return (
            <div
                className={'flex flex-row flex-wrap justify-start ' + className}
            >
                <button
                    className="text-background bg-text flex justify-center items-center m-4 w-fit h-fit rounded-2xl p-4 cursor-wait"
                    disabled={true}
                >
                    Loading Menu Items...
                </button>
            </div>
        );
    }
    return (
        <div
            className={
                'flex flex-row flex-wrap justify-start gap-4 ' + className
            }
        >
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

/**
 * A button component that allows the user to add a specific menu item to the order. It increments the item quantity if already in the order.
 * @param props - Properties passed to the component as specified in CashierItemButtonProps.
 * @return A React button element that updates the order on click.
 */
function CashierItemButton({
    item,
    currentOrder,
    setCurrentOrder,
    className,
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
            className={
                'text-background bg-accent flex justify-center items-center duration-200 w-fit h-fit rounded-2xl p-4 hover:text-text hover:bg-accent/50 ' +
                className
            }
            onClick={handleClick}
        >
            {item.name}
        </button>
    );
}

export default CashierItemGrid;
