'use client';
import React, { useEffect, useState } from 'react';
import PageButton from '@/components/PageButton';
import styles from './page.module.css';
import componentStyles from '@/components/component.module.css';
import InventoryAdjuster from '@/components/InventoryAdjuster';
import { InventoryItem } from '@/lib/models';

export default function Inventory() {
    const inventoryItem: InventoryItem = new InventoryItem(0, '', 0, 0, 0, 0);

    return (
        <main className={styles.inventoryMain}>
            <h1 className={componentStyles.mainHeader}>Manage Inventory</h1>
            <button className={componentStyles.refreshButton + ' ' + styles.refreshButton}>Refresh</button>
            <InventoryAdjuster className={styles.inventoryAdjuster}/>
        </main>
    );
}
