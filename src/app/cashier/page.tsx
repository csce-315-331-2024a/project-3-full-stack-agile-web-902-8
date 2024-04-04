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

// DEBUG: Placeholder menu item data:
const cheese = new Ingredient(
    new InventoryItem(1, 'Cheese', 0.5, 100, 10, 200),
    1
);
const beefPatty = new Ingredient(
    new InventoryItem(2, 'Beef Patty', 1, 100, 10, 200),
    1
);
const bun = new Ingredient(new InventoryItem(3, 'Bun', 0.25, 100, 10, 200), 1);
const lettuce = new Ingredient(
    new InventoryItem(5, 'Lettuce', 0.1, 100, 10, 200),
    1
);
const tomato = new Ingredient(
    new InventoryItem(6, 'Tomato', 0.2, 100, 10, 200),
    1
);
const onion = new Ingredient(
    new InventoryItem(7, 'Onion', 0.15, 100, 10, 200),
    1
);
const bacon = new Ingredient(
    new InventoryItem(8, 'Bacon', 0.5, 100, 10, 200),
    2
);
const mushroom = new Ingredient(
    new InventoryItem(9, 'Mushroom', 0.3, 100, 10, 200),
    5
);
const swissCheese = new Ingredient(
    new InventoryItem(10, 'Swiss Cheese', 0.6, 100, 10, 200),
    1
);
const seasonalSummer = new Seasonal(
    Date.now(),
    Date.now() + 3 * 30 * 24 * 60 * 60 * 1000,
    false
);
const iceCream = new Ingredient(
    new InventoryItem(11, 'Ice Cream', 1, 100, 10, 200),
    1
);
const saladGreens = new Ingredient(
    new InventoryItem(12, 'Salad Greens', 0.5, 100, 10, 200),
    1
);
const chickenBreast = new Ingredient(
    new InventoryItem(13, 'Chicken Breast', 1.5, 100, 10, 200),
    1
);
const croutons = new Ingredient(
    new InventoryItem(14, 'Croutons', 0.3, 100, 10, 200),
    1
);
const dressing = new Ingredient(
    new InventoryItem(15, 'Dressing', 0.2, 100, 10, 200),
    1
);

const sampleMenuItems: MenuItem[] = [
    new MenuItem(
        1,
        'Classic Burger',
        'Burgers',
        9.99,
        5.0,
        5,
        [cheese, beefPatty, bun],
        seasonalSummer
    ),
    new MenuItem(
        2,
        'Veggie Burger',
        'Burgers',
        8.99,
        4.0,
        4,
        [lettuce, tomato, bun],
        seasonalSummer
    ),
    new MenuItem(
        3,
        'Bacon Cheeseburger',
        'Burgers',
        11.99,
        6.5,
        5,
        [cheese, beefPatty, bacon, bun],
        seasonalSummer
    ),
    new MenuItem(
        4,
        'Mushroom Swiss Burger',
        'Burgers',
        12.99,
        7.0,
        5,
        [swissCheese, beefPatty, mushroom, bun],
        seasonalSummer
    ),
    new MenuItem(
        5,
        'BBQ Burger',
        'Burgers',
        10.99,
        5.5,
        5,
        [cheese, beefPatty, onion, bun],
        seasonalSummer
    ),
    new MenuItem(
        6,
        'Deluxe Burger',
        'Burgers',
        13.99,
        7.5,
        5,
        [lettuce, tomato, onion, cheese, beefPatty, bun],
        seasonalSummer
    ),
    new MenuItem(3, 'French Fries', 'Sides', 2.99, 1.0, 5, [], seasonalSummer),
    new MenuItem(4, 'Soft Drink', 'Drinks', 1.99, 0.5, 5, [], seasonalSummer),
    new MenuItem(
        9,
        'Vanilla Ice Cream',
        'Desserts',
        3.99,
        1.5,
        5,
        [iceCream],
        seasonalSummer
    ),
    new MenuItem(
        10,
        'Chicken Caesar Salad',
        'Salads',
        7.99,
        4.0,
        5,
        [saladGreens, chickenBreast, croutons, dressing],
        seasonalSummer
    ),
];

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
    const [items, setItems] = useState<MenuItem[]>(sampleMenuItems);
    const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);
    const [currentOrder, setCurrentOrder] = useState<OrderEntry[]>([]);

    useEffect(() => {
        // TODO: Fetch categories from the server
        const uniqueCategories = Array.from(
            new Set(items.map((item) => item.type))
        );
        setCategories(uniqueCategories);

        if (categories.length > 0) {
            setCategory(categories[0]);
        }
    }, [categories, items]);
    // TODO: should have initial items
    useEffect(() => {
        const itemsInCategory = items.filter((item) => item.type === category);
        setCategoryItems(itemsInCategory);
    }, [category, items]);

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
