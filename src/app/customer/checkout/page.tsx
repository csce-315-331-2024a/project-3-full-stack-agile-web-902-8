'use client';

import {
    OrderEntry,
    CustomerOrderItem,
} from '@/components/CustomerOrderSidebar';
import {
    MenuItem,
    Ingredient,
    InventoryItem,
    Seasonal,
    Order,
    OrderItem,
} from '@/lib/models';

import styles from '@/app/customer/page.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import GlobalConfig from '@/lib/config';

export default function CustomerCheckout() {
    const router = useRouter();

    const [currentOrder, changeCurrentOrder] = useState<OrderEntry[]>([]);

    const [subTotal, setSubTotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

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

    useEffect(() => {
        const subTotal =
            Math.round(
                currentOrder.reduce(
                    (acc, entry) => acc + entry.item.price * entry.qty,
                    0
                ) * 100
            ) / 100;

        const taxAmt = subTotal * GlobalConfig.rates.tax;

        const total = subTotal + taxAmt;

        setSubTotal(subTotal);
        setTax(taxAmt);
        setTotal(total);
    }, [currentOrder]);

    async function placeOrder() {
        if (currentOrder.length === 0) {
            console.log('No items in order');
            return;
        }

        console.log('Redirecting user to customer menu page');
        router.push('/customer/order-placed');

        setIsPlacingOrder(true);
        try {
            const id = 0;
            const timestamp = new Date();
            const items = currentOrder.map(
                (orderEntry) => new OrderItem(orderEntry.qty, orderEntry.item)
            );
            const order = new Order(id, timestamp, 0, total, items, "PENDING");

            const response = await fetch('/api/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log('Order placed:');
            currentOrder.forEach((orderEntry) => {
                console.log(`${orderEntry.qty}x${orderEntry.item.name}`);
            });

            setCurrentOrder([]);
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <main className={styles.main}>
            <header id={styles.topbar}>
                <ul className={styles['nav-left']}>
                    <li>
                        <Link href="/customer">Menu</Link>
                    </li>
                </ul>
                <ul className={styles['nav-right']}>
                    <li>
                        <Link className={styles.login} href="/">
                            Login
                        </Link>
                    </li>
                </ul>
            </header>

            <div id={styles['checkout-page']}>
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
                <div id={styles['checkout']}>
                    <div id={styles['checkout-summary']}>
                        <table id={styles['item-summary']}>
                            <thead>
                                <tr>
                                    <th style={{ width: '70%' }}>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrder.map(({ item, qty }) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>x{qty}</td>
                                        <td>
                                            ${(item.price * qty).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>Subtotal</td>
                                    <td>${subTotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Tax</td>
                                    <td>${tax.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td>${total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <section id={styles.payment}>
                        <h2>Payment Method</h2>
                        <ul className={styles.buttons}>
                            <li>
                                <button
                                    onClick={placeOrder}
                                    disabled={
                                        isPlacingOrder ||
                                        currentOrder.length === 0
                                    }
                                >
                                    {' '}
                                    Dining Dollars{' '}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={placeOrder}
                                    disabled={
                                        isPlacingOrder ||
                                        currentOrder.length === 0
                                    }
                                >
                                    {' '}
                                    Credit Card{' '}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={placeOrder}
                                    disabled={
                                        isPlacingOrder ||
                                        currentOrder.length === 0
                                    }
                                >
                                    {' '}
                                    Debit Card{' '}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={placeOrder}
                                    disabled={
                                        isPlacingOrder ||
                                        currentOrder.length === 0
                                    }
                                >
                                    {' '}
                                    Cash{' '}
                                </button>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
