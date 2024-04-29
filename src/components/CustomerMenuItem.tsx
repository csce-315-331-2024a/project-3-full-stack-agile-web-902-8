import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/models';
import { OrderEntry } from '@/components/CustomerOrderSidebar';
import styles from '@/components/component.module.css';

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
            className={styles['menu-item'] + ' ' + styles.customer}
            onClick={() => addToOrder(item)}
        >
            <Image
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <p className={styles['name']}>{item.name}</p>
            <p className={styles['description']}>{item.description}</p>
            <p className={styles.price}>
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
            className={styles['recommended-item'] + ' ' + styles.customer}
            onClick={() => addToOrder(item)}
        >
            <Image
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={150}
                height={150}
            />
            <p className={styles['name']}>{item.name}</p>
        </button>
    );
}

export default CustomerMenuItem;
