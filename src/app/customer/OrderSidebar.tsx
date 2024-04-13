import React from 'react';
import styles from './page.module.css';
import {MenuItem} from '@/lib/models';

export interface OrderItemProp {
    item: MenuItem,
    qty: number,
    setQty: (qty: number) => void;
}

interface OrderSidebarProp {
    children: React.ReactNode
}

export function OrderItem({item, qty, setQty} : OrderItemProp) {
    return (
        <div className={styles["order-item"]}>
            <img/>
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.description}>
                {/*Description*/}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
            </p>

            <div className={styles["quantity"]}>
                <button>-</button>
                {/* TODO: Add method for onChange */}
                <p>{qty}</p>
                <button>+</button>
            </div>
            <p className={styles.price}>${item.price.toFixed(2)}</p>
        </div>
    )
}

export function OrderSidebar({children}: OrderSidebarProp) {
    return (
        <div id={styles["order-sidebar"]}>
            <div id={styles["order-box"]}>
                {children}
            </div>
            <button className={styles["checkout"]}>
                Checkout
            </button>
        </div>
    )
}
