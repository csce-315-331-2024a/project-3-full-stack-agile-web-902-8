// DONE

'use client';
// TODO: Consider separating client-side and server-side code for MUCH better performance
// TODO: The user should be notified if an order is in progress and if it is successfully placed

// TODO: responsiveness

import React, { useEffect, useState } from 'react';

import CashierCategoryBar from '@/components/CashierCategoryBar';
import CashierItemGrid from '@/components/CashierItemGrid';
import CashierOrderTable from '@/components/CashierOrderTable';

import { MenuItem, Order, OrderItem } from '@/lib/models';
import GlobalConfig from '@/lib/config';

import {
    useScale,
    ScaleProvider,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '@/app/zoom.client';
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
    const { scale, setScale } = useScale();
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
            const order = new Order(
                id,
                timestamp,
                discount,
                total,
                items,
                'PENDING'
            );

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
        <ScaleProvider initialScale={1}>
            {/* Scaled content */}
            <div
                id="scaled-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    overflow: 'auto',
                }}
            ></div>
            <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden grid grid-cols-[1fr_2fr] gap-4 p-4">
                <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-start items-center gap-4 mb-auto">
                    <h1 className="text-[4rem] font-bold relative mainHeader">
                        Cashier
                    </h1>
                    <CashierCategoryBar
                        isFetchingMenuTypes={isFetchingMenuTypes}
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                        className="mx-auto"
                    />
                    <CashierItemGrid
                        isFetchingMenuItems={isFetchingMenuItems}
                        categoryItems={categoryItems}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                        className="h-min"
                    />
                </div>
                <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col justify-start items-center gap-4 mb-auto">
                    <CashierOrderTable
                        isDiscounted={isDiscounted}
                        isTaxed={isTaxed}
                        discount={discount}
                        tax={tax}
                        total={total}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                        className="w-full mb-auto"
                    />
                    <div className="grid grid-cols-[1fr_1fr] gap-4 w-full">
                        <button
                            className="mb-auto col-start-1 col-end-2 text-background bg-accent flex justify-center items-center duration-200 w-full h-fit rounded-2xl p-4 hover:bg-accent/50 hover:text-text"
                            onClick={() => setIsDiscounted(!isDiscounted)}
                        >
                            {isDiscounted ? 'Remove Discount' : 'Add Discount'}
                        </button>
                        <button
                            className="mb-auto col-start-2 col-end-3 text-background bg-accent flex justify-center items-center duration-200 w-full h-fit rounded-2xl p-4 hover:bg-accent/50 hover:text-text"
                            onClick={() => setIsTaxed(!isTaxed)}
                        >
                            {isTaxed ? 'Remove Tax' : 'Add Tax'}
                        </button>
                    </div>
                    <button
                        className={
                            'text-background bg-primary text-2xl flex justify-center items-center duration-200 w-full h-fit m-auto rounded-2xl p-4 hover:bg-primary/70 hover:text-text' +
                            (isPlacingOrder
                                ? ' cursor-wait bg-primary/30 text-text hover:bg-primary/30 hover:text-text'
                                : '')
                        }
                        onClick={() => placeOrder()}
                        disabled={isPlacingOrder}
                    >
                        Place Order
                    </button>
                </div>
            </main>
            {/* Fixed-position zoom controls */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1001, // Above scaled content
                    textAlign: 'center',
                }}
            >
                <ZoomIn />
                <ZoomOut />
                <ResetZoom />
            </div>
        </ScaleProvider>
    );
}
