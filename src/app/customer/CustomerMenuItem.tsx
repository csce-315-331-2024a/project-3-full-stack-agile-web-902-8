'use client';

import React from 'react';
import {MenuItem} from '@/lib/models';
import styles from './page.module.css';

type MenuItemProp = {
    item: MenuItem;
    onClick?: () => void;
};

function CustomerMenuItem({ item, onClick }: MenuItemProp) {

    // Specifying options for formatting
    const options = {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return (
        <button 
            className={styles["menu-item"]}
            onClick={onClick}
        >
        <img src="/menuItemImages/Aggie_Chicken_Club.png"/>
        <p className={styles["name"]}>{item.name}</p>
        <p className={styles["description"]}>
            {/* TODO: Description */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
        </p>
        <p className={styles.price}>
            ${(item.price).toLocaleString('en-US', options)}
        </p>

        <p></p>
        </button>
    );
}

export default CustomerMenuItem;
