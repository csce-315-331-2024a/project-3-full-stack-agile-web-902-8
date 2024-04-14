import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/models';
import styles from '@/components/component.module.css';

type MenuItemProp = {
    item: MenuItem;
    addToOrder: (menuItem: MenuItem) => void;
};

export function CustomerMenuItem({ item, addToOrder }: MenuItemProp) {
    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <button
            className={styles['menu-item'] + ' ' + styles.customer}
            onClick={() => addToOrder(item)}
        >
            <Image
                src="/menuItemImages/Aggie_Chicken_Club.png"
                alt={item.name}
                width={200}
                height={200}
            />
            <p className={styles['name']}>{item.name}</p>
            <p className={styles['description']}>
                {/* TODO: Description */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            </p>
            <p className={styles.price}>
                ${item.price.toLocaleString('en-US', options)}
            </p>
        </button>
    );
}

export function CustomerRecommendedItem({ item, addToOrder }: MenuItemProp) {
    return (
        <button
            className={styles['recommended-item'] + ' ' + styles.customer}
            onClick={() => addToOrder(item)}
        >
            <Image
                src="/menuItemImages/Aggie_Chicken_Club.png"
                alt={item.name}
                width={150}
                height={150}
            />
            <p className={styles['name']}>{item.name}</p>
        </button>
    );
}

export default CustomerMenuItem;
