'use client';
// TODO: Consider separating client-side and server-side code for MUCH better performance

// TODO: If the page is accessed as a manager, they should have a navbar with links to the other pages

// TODO: For some reason, the menu item buttons sometimes update other menu item quantities instead of their own

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
} from '@/lib/models';

// DEBUG: Placeholder order creation:
function placeOrder(currentOrder: OrderEntry[]): void {
    console.log('Placing order with items:');
    currentOrder.forEach((orderEntry) => {
        console.log(`${orderEntry.quantity}x ${orderEntry.item.name}`);
    });
}

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
            const response = await fetch('/api/menuItems');
            const menuItems = await response.json();
            setItems(menuItems);
        }
        fetchAllMenuItems();
    }, [])

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
                onClick={() => placeOrder(currentOrder)}
            >
                Place Order
            </button>
        </main>
    );
}
