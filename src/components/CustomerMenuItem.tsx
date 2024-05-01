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
            className="h-fit bg-transparent block text-center py-4 mx-2 active:bg-secondary/50"
            onClick={() => addToOrder(item)}
        >
            <Image
                className="w-64 aspect-square mx-auto"
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <p className="text-2xl max-lg:text-lg max-md:text-sm">
                {item.name}
            </p>
            <p className="px-8 text-left max-lg:text-sm max-lg:px-0 max-md:text-xs">
                {item.description}
            </p>
            <p className="text-2xl max-lg:text-lg max-md:text-sm flex justify-center items-center">
                ${item.price.toLocaleString('en-US', options)}
            </p>
        </button>
    );
}

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
            className="h-fit bg-transparent text-center p-4 inline-block active:bg-background/50 max-md:p-2 max-md:text-sm max-sm:text-xs"
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
