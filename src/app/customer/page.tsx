'use client';
import styles from '@/app/customer/page.module.css';

import { CustomerMenuItem } from '@/components/CustomerMenuItem';
import CustomerCategoryBar from '@/components/CustomerCategoryBar';
import CustomerRecommendedBar from '@/components/CustomerRecommendedBar';
import {
    OrderItemProp,
    CustomerOrderItem,
    CustomerOrderSidebar,
} from '@/components/CustomerOrderSidebar';
import { MenuItem, Seasonal } from '@/lib/models';
import { useState, useEffect } from 'react';

interface uniqueQuantity {
    id: number,
    qty: number
}

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

    let showPopUp: boolean;
    let setPopUp: Function;
    [showPopUp, setPopUp] = useState(false);

    let orderItems: OrderItemProp[];
    let setOrderItems: (orderItems: OrderItemProp[]) => void;
    [orderItems, setOrderItems] = useState<OrderItemProp[]>([]);

    var qtys: uniqueQuantity[];
    var setQtys: (qtys: uniqueQuantity[]) => void;
    [qtys, setQtys] = useState<uniqueQuantity[]>([{id: -1, qty: 1}]);

    function addToOrder(item: MenuItem) {
        // check if the item already exists
        for(let i = 0; i < orderItems.length; i++) {
            if(item.id == orderItems[i].item.id){
                // increment quantity
                orderItems[i].setQty(orderItems[i].qty + 1);
                return;
            }
        }

        // create new quantity and set quantity function
        console.log(qtys);
        let qty: uniqueQuantity = {id: item.id, qty: 1};
        setQtys([...qtys, qty]);
        console.log(qtys);
        function editQty(newQty: number) {
            console.log(qtys);
            let newQtys = qtys.map(qty => {
                if(item.id != qty.id) {
                    return qty;
                } else {
                    return {id: qty.id, qty: newQty};
                }
            });

            setQtys(newQtys);
        }

        let orderItem: OrderItemProp = {item: item, qty: qtys[qtys.length-1].qty, setQty: editQty};
        setOrderItems([...orderItems, orderItem]);
    }

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
                        addToOrder={addToOrder}
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
                                    addToOrder={addToOrder}
                                />
                            ))}
                    </div>
                ))}
            </div>
            <CustomerOrderSidebar>
                {orderItems.map(({item, qty, setQty}) => (
                    <CustomerOrderItem key={item.id} item={item} qty={qty} setQty={setQty} />
                ))}
            </CustomerOrderSidebar>
        </main>
    );
}
