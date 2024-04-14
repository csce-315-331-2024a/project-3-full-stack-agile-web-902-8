'use client';
import styles from '@/app/customer/page.module.css';

import { CustomerMenuItem } from '@/components/CustomerMenuItem';
import CustomerCategoryBar from '@/components/CustomerCategoryBar';
import CustomerRecommendedBar from '@/components/CustomerRecommendedBar';
import {
    OrderEntry,
    CustomerOrderItem,
    CustomerOrderSidebar,
} from '@/components/CustomerOrderSidebar';
import { MenuItem, Seasonal } from '@/lib/models';
import { useState, useEffect } from 'react';

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
            1,
            'Cheeseburger',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            993,
            'Meal',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            994,
            'Meal',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            995,
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
            996,
            'Water',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            997,
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
            998,
            'Grilled Cheese',
            'type',
            5,
            5,
            10,
            [],
            new Seasonal(0, 0, false)
        ),
        new MenuItem(
            999,
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
            1000,
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
    [currCategory, changeCategory] = useState(categoryNames[0]);

    let currentOrder: OrderEntry[];
    let setCurrentOrder: (orderItems: OrderEntry[]) => void;
    [currentOrder, setCurrentOrder] = useState<OrderEntry[]>([]);

    return (
        // TODO: Change to global styling
        <main className={styles.main}>
            <div id={styles.menu}>
                <h1>Menu</h1>
                <div>
                    <h2>Recommendations</h2>
                    <CustomerRecommendedBar
                        menuItems={menuItemsByCategory
                            .get('Burgers')!
                            .slice(0, 6)}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                </div>
                <div>
                    <h2>Categories</h2>
                    <div id={styles['menu-categories']}>
                        <CustomerCategoryBar
                            categories={categoryNames}
                            category={currCategory}
                            setCategory={changeCategory}
                        />
                    </div>
                </div>
                {/* Menu items */}
                {categoryNames.map((category) => (
                    <div
                        key={category}
                        className={styles['menu-items']}
                        style={
                            category != currCategory ? { display: 'none' } : {}
                        }
                    >
                        {menuItemsByCategory
                            .get(category)!
                            .map((menuitem: MenuItem) => (
                                <CustomerMenuItem
                                    key={menuitem.id}
                                    item={menuitem}
                                    currentOrder={currentOrder}
                                    setCurrentOrder={setCurrentOrder}
                                />
                            ))}
                    </div>
                ))}
            </div>
            <CustomerOrderSidebar>
                {currentOrder.map(({item, qty}) => (
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
