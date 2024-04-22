'use client';
// TODO: Consider separating client-side and server-side code for MUCH better performance
// TODO: If the page is accessed as a manager, they should have a navbar with links to the other pages
// TODO: Numbers should use monospace font, although we should consider adding a fancier monospace font for this
// TODO: The user should be notified if an order is in progress and if it is successfully placed

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
import GlobalConfig from '@/lib/config';

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

    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isFetchingMenuItems, setIsFetchingMenuItems] = useState(false);
    const [isFetchingMenuTypes, setIsFetchingMenuTypes] = useState(false);

    useEffect(() => {
        async function fetchAllMenuTypes() {
            setIsFetchingMenuTypes(true);
            try {
                const response = await fetch('/api/getAllMenuTypes');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const menuTypes = await response.json();
                setCategories(menuTypes);
            } finally {
                setIsFetchingMenuTypes(false);
            }
        }
        fetchAllMenuTypes();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        async function fetchAllMenuItems() {
            setIsFetchingMenuItems(true);
            try {
                console.log(
                    "Fetching menu items may take a while sometimes, especially if you're running locally."
                );
                const response = await fetch('/api/getMenuItemsInSeason');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const menuItems = await response.json();
                setItems(menuItems);
                console.log('Fetching should be done now.');
            } finally {
                setIsFetchingMenuItems(false);
            }
        }
        fetchAllMenuItems();
    }, []);

    useEffect(() => {
        const itemsInCategory = items.filter((item) => item.type === category);
        setCategoryItems(itemsInCategory);
    }, [category, items]);

    useEffect(() => {
        const subTotal =
            Math.round(
                currentOrder.reduce(
                    (acc, entry) => acc + entry.item.price * entry.quantity,
                    0
                ) * 100
            ) / 100;
        const updatedDiscount =
            Math.round(
                subTotal *
                    (isDiscounted ? GlobalConfig.rates.discount : 0) *
                    100
            ) / 100;
        const updatedTax =
            Math.round(
                (subTotal - updatedDiscount) *
                    (isTaxed ? GlobalConfig.rates.tax : 0) *
                    100
            ) / 100;
        const updatedTotal =
            Math.round((subTotal - updatedDiscount + updatedTax) * 100) / 100;

        setDiscount(updatedDiscount);
        setTax(updatedTax);
        setTotal(updatedTotal);
    }, [isDiscounted, isTaxed, currentOrder]);

    async function placeOrder() {
        if (currentOrder.length === 0) {
            console.log('No items in order');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const id = 0;
            const timestamp = new Date();
            const items = currentOrder.map(
                (orderEntry) =>
                    new OrderItem(orderEntry.quantity, orderEntry.item)
            );
            const order = new Order(id, timestamp, discount, total, items);

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
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <main className={componentStyles.cashierMain}>
            <LogoutButton />
            <h1>Cashier</h1>
            <CashierCategoryBar
                isFetchingMenuTypes={isFetchingMenuTypes}
                categories={categories}
                category={category}
                setCategory={setCategory}
            />
            <CashierItemGrid
                isFetchingMenuItems={isFetchingMenuItems}
                categoryItems={categoryItems}
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />
            <CashierOrderTable
                isDiscounted={isDiscounted}
                isTaxed={isTaxed}
                discount={discount}
                tax={tax}
                total={total}
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />
            <button
                className={
                    componentStyles.placeOrder +
                    ' ' +
                    componentStyles.card +
                    (isPlacingOrder ? ' ' + componentStyles.disabled : '')
                }
                onClick={() => placeOrder()}
                disabled={isPlacingOrder}
            >
                Place Order
            </button>
            <div className={componentStyles.discountTaxButtons}>
                <button
                    className={
                        componentStyles.discountOrder +
                        ' ' +
                        componentStyles.card
                    }
                    onClick={() => setIsDiscounted(!isDiscounted)}
                >
                    {isDiscounted ? 'Remove Discount' : 'Add Discount'}
                </button>
                <button
                    className={
                        componentStyles.noTaxOrder + ' ' + componentStyles.card
                    }
                    onClick={() => setIsTaxed(!isTaxed)}
                >
                    {isTaxed ? 'Remove Tax' : 'Add Tax'}
                </button>
            </div>
        </main>
    );
}
