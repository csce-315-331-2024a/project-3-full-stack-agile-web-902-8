'use client';
import styles from '@/app/page.module.css';
import customerStyles from '@/app/customer/page.module.css';
import {
    ScaleProvider,
    useScale,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '../zoom.client'; // Assuming these are exported correctly in menu.client.tsx

import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import CustomerMenuItem from '@/components/CustomerMenuItem';
import CustomerNav from '@/app/customer/customer-nav';
import React from 'react';

export default function Customer() {
    let categoryNames: Array<string> = [
        'Burgers',
        'Drinks',
        'Sandwiches',
        'Baskets',
    ];
    let menuItemsByCategory: Map<string, Array<string>> = new Map();
    menuItemsByCategory.set('Burgers', ['Hamburger', 'Cheeseburger', 'Meal']);
    menuItemsByCategory.set('Drinks', ['Water', 'Fountain Drink']);
    menuItemsByCategory.set('Sandwiches', ['Grilled Cheese', 'Ham Sandwich']);
    menuItemsByCategory.set('Baskets', ['3 Tender Basket']);

    const [currCategory, changeCategory] = React.useState(categoryNames[0]);
    const [showPopUp, setPopUp] = React.useState(false);
    const { scale } = useScale(); // Use the scale from the context

    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];

    return (
        <ScaleProvider initialScale={1}>
            <main
                className={styles.main}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    overflow: 'auto',
                }}
            >
                <CustomerNav />
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
                <DoubleText
                    block1={<SideBar names={Items2} hrefs={Links2} />}
                    block2={
                        <div className={customerStyles['main']}>
                            <h1 className={customerStyles.pageTitle}>
                                Customer
                            </h1>
                            <nav id={customerStyles['categories']}>
                                <ul>
                                    {categoryNames.map((name) => (
                                        <li key={name}>
                                            <button
                                                onClick={() =>
                                                    changeCategory(name)
                                                }
                                            >
                                                {name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div id={customerStyles['menu-items']}>
                                {menuItemsByCategory
                                    .get(currCategory)!
                                    .map((menuitem: string) => (
                                        <CustomerMenuItem
                                            key={menuitem}
                                            name={menuitem}
                                            onClick={() => setPopUp(true)}
                                        />
                                    ))}
                            </div>
                            {showPopUp ? (
                                <section id={customerStyles['pop-up']}>
                                    <button
                                        className={
                                            customerStyles['exit-button']
                                        }
                                        onClick={() => setPopUp(false)}
                                    >
                                        X
                                    </button>
                                </section>
                            ) : null}
                        </div>
                    }
                />
            </main>
        </ScaleProvider>
    );
}
