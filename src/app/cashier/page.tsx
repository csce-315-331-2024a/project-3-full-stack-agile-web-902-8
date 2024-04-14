'use client';
// TODO: Consider separating client-side and server-side code for MUCH better performance

// TODO: If the page is accessed as a manager, they should have a navbar with links to the other pages

// TODO: Discount button and no tax button
// TODO: Numbers should use monospace font, although we should consider adding a fancier monospace font for this

import React, { useEffect, useState } from 'react';
import LogoutButton from '@/components/LogoutButton';
import CashierCategoryBar from '@/components/CashierCategoryBar';
import CashierItemGrid from '@/components/CashierItemGrid';
import CashierOrderTable from '@/components/CashierOrderTable';
import componentStyles from '@/components/component.module.css';
import {
    ScaleProvider,
    useScale,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '../zoom.client';

import { MenuItem, OrderItem, Order } from '@/lib/models';

// TODO: These should be defined elsewhere
const DISCOUNT_RATE = 0.1;
const TAX_RATE = 0.0825;

export interface OrderEntry {
    item: MenuItem;
    quantity: number;
}

export default function Cashier() {
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);
    const [currentOrder, setCurrentOrder] = useState<OrderEntry[]>([]);
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [isTaxed, setIsTaxed] = useState(true);
    const { scale } = useScale();

    useEffect(() => {
        async function fetchAllMenuTypes() {
            const response = await fetch('/api/getAllMenuTypes');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const menuTypes = await response.json();
            setCategories(menuTypes);
        }
        fetchAllMenuTypes();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        const itemsInCategory = items.filter((item) => item.type === category);
        setCategoryItems(itemsInCategory);
    }, [category, items]);

    useEffect(() => {
        async function fetchAllMenuItems() {
            console.log('Fetching menu items...');
            const response = await fetch('/api/getMenuItemsInSeason');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const menuItems = await response.json();
            setItems(menuItems);
        }
        fetchAllMenuItems();
    }, []);

    async function placeOrder() {
        if (currentOrder.length === 0) {
            console.log('No items in order');
            return;
        }

        const subTotal =
            Math.round(
                currentOrder.reduce(
                    (acc, entry) => acc + entry.item.price * entry.quantity,
                    0
                ) * 100
            ) / 100;
        const discount =
            Math.round(subTotal * (isDiscounted ? DISCOUNT_RATE : 0) * 100) /
            100;
        const tax =
            Math.round((subTotal - discount) * (isTaxed ? TAX_RATE : 0) * 100) /
            100;
        const total = Math.round((subTotal - discount + tax) * 100) / 100;

        const items = currentOrder.map(
            (orderEntry) => new OrderItem(orderEntry.quantity, orderEntry.item)
        );
        const order = new Order(0, new Date(), discount, total, items);

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
            console.log(`${orderEntry.quantity}x ${orderEntry.item.name}`);
        });

        setCurrentOrder([]);
        setIsDiscounted(false);
        setIsTaxed(true);
    }

    return (
        <ScaleProvider initialScale={1}>
            <main
                className={componentStyles.cashierMain}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                    }}
                >
                    <ZoomIn />
                    <ZoomOut />
                    <ResetZoom />
                </div>
                <LogoutButton />
                <h1>Cashier</h1>
                <CashierCategoryBar
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                />
                <CashierItemGrid
                    categoryItems={categoryItems}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                />
                <CashierOrderTable
                    isDiscounted={isDiscounted}
                    isTaxed={isTaxed}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                />
                <button
                    className={`${componentStyles.placeOrder} ${componentStyles.card}`}
                    onClick={placeOrder}
                >
                    Place Order
                </button>
                <div className={componentStyles.discountTaxButtons}>
                    <button
                        className={`${componentStyles.discountOrder} ${componentStyles.card}`}
                        onClick={() => setIsDiscounted(!isDiscounted)}
                    >
                        {isDiscounted ? 'Remove Discount' : 'Add Discount'}
                    </button>
                    <button
                        className={`${componentStyles.noTaxOrder} ${componentStyles.card}`}
                        onClick={() => setIsTaxed(!isTaxed)}
                    >
                        {isTaxed ? 'Remove Tax' : 'Add Tax'}
                    </button>
                </div>
            </main>
        </ScaleProvider>
    );
}
