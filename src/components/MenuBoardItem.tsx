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
            <p className={styles['name']}>{item.name}</p>
            <p className={styles['description']}>
                {/* TODO: Description */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            </p>
            <p className={styles.price}>
                ${item.price.toLocaleString('en-US', options)}
            </p>
        </div>
    );
}

export default MenuBoardItem;
