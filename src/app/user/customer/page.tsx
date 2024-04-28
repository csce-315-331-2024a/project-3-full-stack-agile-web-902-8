'use client';

import CustomerItemGrid from '@/components/CustomerItemGrid';
import CustomerCategoryBar from '@/components/CustomerCategoryBar';
import CustomerRecommendedBar from '@/components/CustomerRecommendedBar';
import {
    OrderEntry,
    CustomerOrderItem,
    CustomerOrderSidebar,
} from '@/components/CustomerOrderSidebar';
import { MenuItem } from '@/lib/models';
import { useState, useEffect } from 'react';

export default function Customer() {
    // set default category
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);

    const [currentOrder, changeCurrentOrder] = useState<OrderEntry[]>([]);

    const [recommendedItems, setRecommendedItems] = useState<MenuItem[]>([]);

    const [isFetchingMenuItems, setIsFetchingMenuItems] = useState(false);
    const [isFetchingMenuTypes, setIsFetchingMenuTypes] = useState(false);
    const [isFetchingRecommendations, setIsFetchingRecommendations] =
        useState(false);

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
        setIsFetchingRecommendations(true);
        if (isFetchingMenuItems || items.length === 0) return;
        (async () => {
            try {
                const geoloc: [number, number] | null = await new Promise(
                    (R) => {
                        // console.log("Asking for location");
                        navigator.geolocation.getCurrentPosition(
                            (p) => R([p.coords.latitude, p.coords.longitude]),
                            () => R(null)
                        );
                    }
                );
                // console.log("got location", geoloc);
                const response = await fetch(
                    '/api/recommendedItems' +
                        (geoloc !== null
                            ? `?lat=${geoloc[0]}&lon=${geoloc[1]}`
                            : '')
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const recIds: number[] = await response.json();
                // console.log("recieved recommendations:", recIds);
                setRecommendedItems(
                    items.filter((i: MenuItem) => recIds.includes(i.id))
                );
            } finally {
                setIsFetchingRecommendations(false);
            }
        })();
    }, [items, isFetchingMenuItems]);

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

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden flex flex-row">
            <div className="w-[calc(100%_-_20rem)] p-4 overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
                <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                    Menu
                </h1>
                <div>
                    <h2 className="text-2xl font-bold">Recommendations</h2>
                    <p>Based on the current weather</p>
                    <CustomerRecommendedBar
                        isFetchingMenuItems={isFetchingRecommendations}
                        menuItems={recommendedItems}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <CustomerCategoryBar
                        isFetchingMenuTypes={isFetchingMenuTypes}
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
                {/* Menu items */}
                <CustomerItemGrid
                    isFetchingMenuItems={isFetchingMenuItems}
                    categoryItems={categoryItems}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                />
            </div>
            <CustomerOrderSidebar
                checkoutPage={'/user/customer/checkout'}
                currentOrder={currentOrder}
            >
                {currentOrder.map(({ item, qty }) => (
                    <CustomerOrderItem
                        key={item.id}
                        item={item}
                        qty={qty}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                ))}
            </CustomerOrderSidebar>
        </main>
    );
}
