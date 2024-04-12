'use client';
// TODO: Consider separating client-side and server-side code for MUCH better performance

// TODO: If the page is accessed as a manager, they should have a navbar with links to the other pages

// TODO: For some reason, the menu item buttons sometimes update other menu item quantities instead of their own
// TODO: Discount button
// TODO: Numbers should use monospace font, although we should consider adding a fancier font for this
// TODO: Make sure that orders with no items are not placed

import React, { useEffect, useState } from 'react';

import LogoutButton from '@/components/LogoutButton';
import CashierCategoryBar from '@/components/CashierCategoryBar';
import CashierItemGrid from '@/components/CashierItemGrid';
import CashierOrderTable from '@/components/CashierOrderTable';
import componentStyles from '@/components/component.module.css';

import {
    MenuItem,
    Ingredient,
    InventoryItem,
    Seasonal,
    Order,
    OrderItem,
} from '@/lib/models';

const discountRate = 0.1;

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

    useEffect(() => {
        async function fetchAllMenuTypes(){
            const response = await fetch('/api/menuTypes');
            const menuTypes = await response.json();
            setCategories(menuTypes);
            if(category === '' && menuTypes.length > 0){
                setCategory(menuTypes[0]);
            }
        }
        fetchAllMenuTypes();
    });

    useEffect(() => {
        const itemsInCategory = items.filter((item) => item.type === category);
        setCategoryItems(itemsInCategory);
    }, [category, items]);

    useEffect(() => {
        async function fetchAllMenuItems(){
            console.log("Fetching menu items may take a while sometimes, especially if you're running locally.");
            const response = await fetch('/api/menuItems');
            const menuItems = await response.json();
            setItems(menuItems);
            console.log("Fetching should be done now.");
        }
        fetchAllMenuItems();
    }, [])

    // TODO: also clear the order from the ui
    async function placeOrder(currentOrder: OrderEntry[], isDiscounted: boolean) {
        if (currentOrder.length === 0) {
            console.log('No items in order');
            return;
        }

        const id = 0;
        const timestamp = new Date();
        let total = currentOrder.reduce((acc, orderEntry) =>
            acc + orderEntry.item.price * orderEntry.quantity,
            0
        );
        const discount = isDiscounted ? total * discountRate : 0;
        total -= discount;
        const items = currentOrder.map((orderEntry) => new OrderItem(orderEntry.quantity, orderEntry.item));
        const order = new Order(id, timestamp, discount, total, items);

        const response = await fetch('/api/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if(!response.ok){
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log('Order placed:');
        currentOrder.forEach((orderEntry) => {
            console.log(`${orderEntry.quantity}x ${orderEntry.item.name}`);
        });

        setCurrentOrder([]);
    }

    return (
        <main className={componentStyles.cashierMain}>
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
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />
            <button
                className={
                    componentStyles.placeOrder + ' ' + componentStyles.card
                }
                onClick={() => placeOrder(currentOrder, false)}
            >
                Place Order
            </button>
        </main>
    );
}
