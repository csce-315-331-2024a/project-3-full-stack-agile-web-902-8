'use client';

import {
    OrderEntry,
    CustomerOrderItem,
} from '@/components/CustomerOrderSidebar';
import styles from '@/app/customer/page.module.css';
import { useState, useEffect } from 'react';

export default function CustomerCheckout() {
    const [currentOrder, changeCurrentOrder] = useState<OrderEntry[]>([]);

    // wrapper around setting the current order
    function setCurrentOrder(currentOrder: OrderEntry[]) {
        localStorage.setItem('customer-order', JSON.stringify(currentOrder));
        changeCurrentOrder(currentOrder);
    }

    useEffect(() => {
        // grab the order from local storage if it exists
        let serializedOrder = localStorage.getItem('customer-order');
        let order = [];
        if (serializedOrder != null) {
            order = JSON.parse(serializedOrder);
        }
        changeCurrentOrder(order);
    }, []);

    return (
        <main className={styles.main}>
            <div id={styles['order-box']}>
                {currentOrder.map(({ item, qty }) => (
                    <CustomerOrderItem
                        key={item.id}
                        item={item}
                        qty={qty}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                ))}
            </div>
            <div id={styles["checkout-summary"]}>
                <table id={styles["item-summary"]}>
                    <thead>
                        <tr>
                            <th style={{width: "70%"}}>item</th>
                            <th>quantity</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrder.map(({ item, qty }) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>x{qty}</td>
                                <td>${(item.price * qty).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
