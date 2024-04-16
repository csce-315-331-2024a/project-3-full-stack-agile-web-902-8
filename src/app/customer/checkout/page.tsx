'use client'

import {OrderEntry, CustomerOrderItem} from '@/components/CustomerOrderSidebar';
import styles from '@/app/customer/page.module.css';
import { useState, useEffect } from 'react';

export default function CustomerCheckout() {
    const [currentOrder, changeCurrentOrder] = useState<OrderEntry[]>([]);

    // wrapper around setting the current order
    function setCurrentOrder(currentOrder: OrderEntry[]) {
        localStorage.setItem("customer-order", JSON.stringify(currentOrder));
        changeCurrentOrder(currentOrder);
    }

    useEffect(() => {
        // grab the order from local storage if it exists
        let serializedOrder = localStorage.getItem("customer-order");
        let order = [];
        if(serializedOrder != null){
            order = JSON.parse(serializedOrder);
        }
        changeCurrentOrder(order);
    }, []);




    return (
        <main className={styles.main}>
            <div id={styles.orderbox}>
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
            <div>
                
            </div>
        </main>
    );
}
