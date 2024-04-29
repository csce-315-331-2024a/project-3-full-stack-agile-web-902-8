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
        router.push('/user/customer/order-placed');

        setIsPlacingOrder(true);
        try {
            const id = 0;
            const timestamp = new Date();
            const items = currentOrder.map(
                (orderEntry) => new OrderItem(orderEntry.qty, orderEntry.item)
            );
            const order = new Order(id, timestamp, 0, total, items, 'PENDING');

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
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden h-full flex flex-row">
            <div className="w-[500px] border-[1px] border-solid border-text m-12 mr-0 overflow-y-scroll">
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
            <div className="w-[70%] m-12">
                <div className="h-[75%] overflow-y-scroll">
                    <table className="w-full border-collapse border-b-[1px] border-b-solid border-b-text text-lg">
                        <thead className="h-16 top-0 sticky z-1">
                            <tr>
                                <th className="text-left w-[70%] py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Item
                                </th>
                                <th className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Quantity
                                </th>
                                <th className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.map(({ item, qty }) => (
                                <tr key={item.id}>
                                    <td className="text-left py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        {item.name}
                                    </td>
                                    <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        x{qty}
                                    </td>
                                    <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        ${(item.price * qty).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-background bottom-0 sticky z-1">
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Subtotal
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${subTotal.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Tax
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${tax.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Total
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${total.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <section className="w-full h-fit flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <h2 className="text-2xl font-bold w-fit h-fit">
                            Payment Method
                        </h2>
                        <Link
                            className="bg-secondary duration-200 hover:bg-secondary/70 w-fit p-4 rounded-2xl"
                            href="/user/customer/"
                        >
                            Back to menu
                        </Link>
                    </div>
                    <ul className="grid grid-cols-[repeat(4,1fr)]">
                        <li className="h-full">
                            <button
                                className="bg-secondary w-full py-8 text-2xl duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:cursor-not-allowed rounded-[1rem_0_0_1rem] border-background border-r-2"
                                onClick={placeOrder}
                                disabled={
                                    isPlacingOrder || currentOrder.length === 0
                                }
                            >
                                {' '}
                                Dining Dollars{' '}
                            </button>
                        </li>
                        <li className="h-full">
                            <button
                                className="bg-secondary w-full py-8 text-2xl duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:cursor-not-allowed border-background border-l-2 border-r-2"
                                onClick={placeOrder}
                                disabled={
                                    isPlacingOrder || currentOrder.length === 0
                                }
                            >
                                {' '}
                                Credit Card{' '}
                            </button>
                        </li>
                        <li className="h-full">
                            <button
                                className="bg-secondary w-full py-8 text-2xl duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:cursor-not-allowed border-background border-l-2 border-r-2"
                                onClick={placeOrder}
                                disabled={
                                    isPlacingOrder || currentOrder.length === 0
                                }
                            >
                                {' '}
                                Debit Card{' '}
                            </button>
                        </li>
                        <li className="h-full">
                            <button
                                className="bg-secondary w-full py-8 text-2xl duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:cursor-not-allowed rounded-[0_1rem_1rem_0] border-background border-l-2"
                                onClick={placeOrder}
                                disabled={
                                    isPlacingOrder || currentOrder.length === 0
                                }
                            >
                                {' '}
                                Cash{' '}
                            </button>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
