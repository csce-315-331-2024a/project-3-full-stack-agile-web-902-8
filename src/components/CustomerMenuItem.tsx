// ALL TAILWIND

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/models';
import { OrderEntry } from '@/components/CustomerOrderSidebar';

interface MenuItemProp {
    item: MenuItem;
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

/**
 * A functional component that displays a single menu item and allows adding it to the current order.
 * Users can interact with the item to add it to their order directly from the menu display.
 * @param item - The menu item to display.
 * @param currentOrder - The current list of order entries.
 * @param setCurrentOrder - Function to update the order state by adding the item or updating its quantity.
 * @return A React element representing a single menu item with the option to add it to the order.
 */
export function CustomerMenuItem({
    item,
    currentOrder,
    setCurrentOrder,
}: MenuItemProp) {
    // create new quantity and set quantity function
    function setQty(qty: number) {
        let newItems = currentOrder.map((orderItem) => {
            if (orderItem.item.id == item.id) {
                return {
                    item: orderItem.item,
                    qty: qty,
                };
            } else {
                return orderItem;
            }
        });

        setCurrentOrder(newItems);
    }

    function addToOrder(item: MenuItem) {
        // check if the item already exists
        for (let i = 0; i < currentOrder.length; i++) {
            if (item.id == currentOrder[i].item.id) {
                // increment quantity
                setQty(currentOrder[i].qty + 1);
                return;
            }
        }

        let orderItem: OrderEntry = { item: item, qty: 1 };
        setCurrentOrder([...currentOrder, orderItem]);
    }

    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <button
            className="h-fit bg-transparent block text-center py-4 mx-4 active:bg-secondary/50"
            onClick={() => addToOrder(item)}
        >
            <Image
                className="w-64 aspect-square mx-auto"
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <p className="text-2xl">{item.name}</p>
            <p className="px-8 text-center">{item.description}</p>
            <p className="text-2xl flex justify-center items-center">
                ${item.price.toLocaleString('en-US', options)}
            </p>
        </button>
    );
}

/**
 * A functional component that displays a recommended menu item in a compact layout, facilitating quick add to the order.
 * This component is used primarily for showcasing recommended or popular items in a more focused manner.
 * @param item - The menu item recommended for quick addition.
 * @param currentOrder - The current list of order entries.
 * @param setCurrentOrder - Function to manage updates to the current order upon user interaction.
 * @return A React element representing a recommended item with streamlined interaction for addition to the order.
 */
export function CustomerRecommendedItem({
    item,
    currentOrder,
    setCurrentOrder,
}: MenuItemProp) {
    // create new quantity and set quantity function
    function setQty(qty: number) {
        let newItems = currentOrder.map((orderItem) => {
            if (orderItem.item.id == item.id) {
                return {
                    item: orderItem.item,
                    qty: qty,
                };
            } else {
                return orderItem;
            }
        });

        setCurrentOrder(newItems);
    }

    function addToOrder(item: MenuItem) {
        // check if the item already exists
        for (let i = 0; i < currentOrder.length; i++) {
            if (item.id == currentOrder[i].item.id) {
                // increment quantity
                setQty(currentOrder[i].qty + 1);
                return;
            }
        }

        let orderItem: OrderEntry = { item: item, qty: 1 };
        setCurrentOrder([...currentOrder, orderItem]);
    }

    return (
        <button
            className="h-fit bg-transparent text-center p-4 inline-block active:bg-background/50"
            onClick={() => addToOrder(item)}
        >
            <div className="flex justify-center">
                <Image
                    className="w-32 aspect-square"
                    src={`/api/menuImages/${item.id}`}
                    alt={item.name}
                    width={150}
                    height={150}
                />
            </div>
            <p>{item.name}</p>
        </button>
    );
}

export default CustomerMenuItem;
