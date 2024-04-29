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
            className="h-fit bg-transparent block text-center py-4 mx-4 active:bg-secondary/50"
            onClick={() => addToOrder(item)}
        >
            <Image
                className="max-w-64 mx-auto"
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <p className="text-2xl">{item.name}</p>
            <p className="px-8 text-center">
                {/* TODO: Description */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            </p>
            <p className="text-2xl flex justify-center items-center">
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
            className="h-fit bg-transparent text-center p-4 inline-block active:bg-background/50"
            onClick={() => addToOrder(item)}
        >
            <Image
                className="max-w-32 max-h-32"
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={150}
                height={150}
            />
            <p>{item.name}</p>
        </button>
    );
}

export default CustomerMenuItem;
