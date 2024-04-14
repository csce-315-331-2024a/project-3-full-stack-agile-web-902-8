'use client';
import styles from '@/app/customer/page.module.css';

import {
    CustomerMenuItem,
    CustomerRecommendedItem,
} from '@/app/customer/CustomerMenuItem';
import CustomerCategoryBar from '@/app/customer/CategoryBar';
import { OrderItem, OrderSidebar } from '@/app/customer/OrderSidebar';
import { MenuItem, Seasonal } from '@/lib/models';
import React from 'react';

export default function Customer() {
    // TODO: Change from static to dynamic from database
    let categoryNames: Array<string> = [
        'Burgers',
        'Drinks',
        'Sandwiches',
        'Baskets',
    ];
    // TODO: Change from static to dynamic from database
    let menuItemsByCategory: Map<string, Array<MenuItem>> = new Map();
    menuItemsByCategory.set('Burgers', [
        new MenuItem(
            0,
            'Hamburger',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            0,
            'Cheeseburger',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            0,
            'Meal',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
    ]);
    menuItemsByCategory.set('Drinks', [
        new MenuItem(
            0,
            'Water',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            0,
            'Fountain Drink',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
    ]);
    menuItemsByCategory.set('Sandwiches', [
        new MenuItem(
            0,
            'Grilled Cheese',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            0,
            'Ham Sandwich',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
    ]);
    menuItemsByCategory.set('Baskets', [
        new MenuItem(
            0,
            '3 Tender Basket',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
    ]);

    // set default category
    let currCategory: string;
    let changeCategory: (category: string) => void;
    [currCategory, changeCategory] = React.useState(categoryNames[0]);

    let showPopUp: boolean;
    let setPopUp: Function;
    [showPopUp, setPopUp] = React.useState(false);

    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];

    let item = new MenuItem(
        1,
        'Aggie Chicken Club',
        'type',
        10,
        10,
        10,
        [],
        new Seasonal(1, 1, false)
    );
    let [qty, setQty] = React.useState(1);

    return (
        // TODO: Change to global styling
        <main className={styles.main}>
            <div id={styles.menu}>
                <h1>Menu</h1>
                <div>
                    <h2>Recommendations</h2>
                    <ul className={styles.bar}>
                        {menuItemsByCategory
                            .get('Burgers')!
                            .map((menuItem: MenuItem) => (
                                <li key={menuItem.name}>
                                    <CustomerRecommendedItem
                                        item={menuItem}
                                        onClick={() => setPopUp(true)}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <h2>Categories</h2>
                    <div className={styles.bar} id={styles['menu-categories']}>
                        <CustomerCategoryBar
                            categories={categoryNames}
                            category={currCategory}
                            setCategory={changeCategory}
                        />
                    </div>
                </div>
                {/* Menu items */}
                <div id={styles['menu-items']}>
                    {menuItemsByCategory
                        .get(currCategory)!
                        .map((menuitem: MenuItem) => (
                            <CustomerMenuItem
                                key={menuitem.name}
                                item={menuitem}
                                onClick={() => setPopUp(true)}
                            />
                        ))}
                </div>
            </div>
            <OrderSidebar>
                <OrderItem item={item} qty={qty} setQty={setQty} />
                <OrderItem item={item} qty={qty} setQty={setQty} />
                <OrderItem item={item} qty={qty} setQty={setQty} />
                <OrderItem item={item} qty={qty} setQty={setQty} />
                <OrderItem item={item} qty={qty} setQty={setQty} />
                <OrderItem item={item} qty={qty} setQty={setQty} />
            </OrderSidebar>
        </main>
    );
}
