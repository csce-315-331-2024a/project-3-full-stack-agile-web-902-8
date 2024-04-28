import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/models';
import styles from '@/components/component.module.css';

interface MenuItemProp {
    item: MenuItem;
}

export function MenuBoardItem({
    item,
}: MenuItemProp) {
    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <div
            className={styles['menu-item'] + ' ' + styles["menu-board"]}
        >
            <Image
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <div>
                <h3 className={styles['name']}>{item.name}</h3>
                <p className={styles['description']}>
                    {item.description}
                </p>
            </div>
            <div className={styles.price}>
                <p>${item.price.toLocaleString('en-US', options)}</p>
            </div>
        </div>
    );
}

export default MenuBoardItem;
