import React from 'react';
import Image from 'next/image';
import styles from '@/components/component.module.css';
import { MenuItem } from '@/lib/models';

export interface OrderEntry {
    item: MenuItem;
    qty: number;
}

export interface OrderItemProp {
    item: MenuItem;
    qty: number;
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

interface OrderSidebarProp {
    children: React.ReactNode;
    // TODO: Change from just empty order to send order
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

export function CustomerOrderItem({
    item,
    qty,
    currentOrder,
    setCurrentOrder,
}: OrderItemProp) {
    function setQty(qty: number) {
        let newItems = currentOrder
            .map((orderItem) => {
                if (orderItem.item.id == item.id) {
                    return {
                        item: orderItem.item,
                        qty: qty,
                    };
                } else {
                    return orderItem;
                }
            })
            .filter((orderItem) => {
                return orderItem.qty > 0;
            });

        setCurrentOrder(newItems);
    }

    function changeQty(newQty: number) {
        if (newQty > -1 && newQty < 100) {
            setQty(newQty);
        }
    }

    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <div className={styles['order-item'] + ' ' + styles.customer}>
            <Image
                src="/menuItemImages/Aggie_Chicken_Club.png"
                alt={item.name}
                width={100}
                height={100}
            />
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.description}>
                {/* TODO: Description*/}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            </p>

            <div className={styles['quantity']}>
                <button onClick={() => changeQty(qty - 1)}>
                    {qty == 1 ? 'x' : '-'}
                </button>
                {/* TODO: Add method for onChange */}
                <p>{qty}</p>
                <button onClick={() => changeQty(qty + 1)}>+</button>
            </div>
            <p className={styles.price}>
                ${(item.price * qty).toLocaleString('en-US', options)}
            </p>
        </div>
    );
}

export function CustomerOrderSidebar({
    children,
    setCurrentOrder,
}: OrderSidebarProp) {
    return (
        <div id={styles['order-sidebar']} className={styles.customer}>
            <div id={styles['order-box']}>{children}</div>
            <button
                className={styles['checkout']}
                // TODO: Change from just empty order to send order
                onClick={() => setCurrentOrder([])}
            >
                Checkout
            </button>
        </div>
    );
}
