'use client';
import styles from '@/app/customer/page.module.css';

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
import Link from 'next/link';

export default function Customer() {
    // set default category
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState<MenuItem[]>([]);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);
    const [recommendedItems, setRecommendedItems] = useState<MenuItem[]>([]);

    const [isFetchingMenuItems, setIsFetchingMenuItems] = useState(false);
    const [isFetchingMenuTypes, setIsFetchingMenuTypes] = useState(false);

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
                const recommendationResponse = await fetch(
                    '/api/recommendedItems'
                );
                if (!recommendationResponse.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const recIds: number[] = await recommendationResponse.json();
                setRecommendedItems(
                    menuItems.filter((i: MenuItem) => recIds.includes(i.id))
                );
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
        // TODO: Change to global styling
        <main className={styles.main}>
            <header id={styles.topbar}>
                <ul className={styles['nav-right']}>
                    <li>
                        <Link className={styles.login} href="/">
                            Login
                        </Link>
                    </li>
                </ul>
            </header>

            <div id={styles['menu-page']}>
                <div id={styles.menu}>
                    <h1>Menu</h1>
                    <div>
                        <h2>Recommendations</h2>
                        <CustomerRecommendedBar
                            isFetchingMenuItems={isFetchingMenuItems}
                            menuItems={recommendedItems}
                            currentOrder={currentOrder}
                            setCurrentOrder={setCurrentOrder}
                        />
                    </div>
                    <div>
                        <h2>Categories</h2>
                        <div id={styles['menu-categories']}>
                            <CustomerCategoryBar
                                isFetchingMenuTypes={isFetchingMenuTypes}
                                categories={categories}
                                category={category}
                                setCategory={setCategory}
                            />
                        </div>
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
                    checkoutPage={'/customer/checkout'}
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
            </div>
        </main>
    );
}
