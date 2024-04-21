'use client';
import React, { useEffect, useState } from 'react';
import PageButton from '@/components/PageButton';
import styles from '@/app/page.module.css';
import InventoryAdjuster from '@/components/InventoryAdjuster';
import { InventoryItem } from '@/lib/models';

export default function Inventory() {
    const inventoryItem: InventoryItem = new InventoryItem(0, '', 0, 0, 0, 0);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <h1>Manage Inventory</h1>
                    <PageButton>Refresh</PageButton>
                    <InventoryAdjuster />
                </div>
            </div>
        </main>
    );
}
