'use client';
import styles from '@/app/page.module.css';
import customerStyles from '@/app/customer/page.module.css';

import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import CustomerMenuItem from '@/components/CustomerMenuItem';
import CustomerNav from '@/app/customer/customer-nav';
import React from 'react';

export default function Customer() {
    const openMenuBoardsPages = () => {
        window.open('/menuboards/Burgs', '_blank');
        window.open('/menuboards/Meals_Limited', '_blank');
        window.open('/menuboards/Misc', '_blank');
        window.open('/menuboards/Sandwiches_Baskets', '_blank');
    };

    // TODO: Change from static to dynamic from database
    let categoryNames: Array<string> = [
        'Burgers',
        'Drinks',
        'Sandwiches',
        'Baskets',
    ];
    // TODO: Change from static to dynamic from database
    let menuItemsByCategory: Map<string, Array<string>> = new Map();
    menuItemsByCategory.set('Burgers', ['Hamburger', 'Cheeseburger', 'Meal']);
    menuItemsByCategory.set('Drinks', ['Water', 'Fountain Drink']);
    menuItemsByCategory.set('Sandwiches', ['Grilled Cheese', 'Ham Sandwich']);
    menuItemsByCategory.set('Baskets', ['3 Tender Basket']);

    // set default category
    let currCategory: string;
    let changeCategory: Function;
    [currCategory, changeCategory] = React.useState(categoryNames[0]);

    let showPopUp: boolean;
    let setPopUp: Function;
    [showPopUp, setPopUp] = React.useState(false);

    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];

    return (
        // TODO: Change to global styling
        <main className={styles.main}>
            <div className={styles.description}>
                <div>
                    <CustomerNav />
                </div>
                <div className={styles.body}>
                    <DoubleText
                        block1=<SideBar
                            names={Items2}
                            hrefs={Links2}
                            onClick={openMenuBoardsPages}
                        />
                        block2=<div className={customerStyles['main']}>
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

                            {/* Menu items */}
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

                            {/* Pop up for adding to order */}
                            {showPopUp ? (
                                <section id={customerStyles['pop-up']}>
                                    {/* Exit button */}
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
                    />
                </div>
            </div>
        </main>
    );
}
