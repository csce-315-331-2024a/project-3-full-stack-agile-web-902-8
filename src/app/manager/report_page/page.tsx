import React, { useEffect, useState } from 'react';

import Heading from '@/components/Heading';
import styles from '@/app/page.module.css';
import tables from '@/components/component.module.css'

export default function MenuBoard() {
    const items = ['', 'Back'];
    const links = ['/', '/manager'];

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Heading names={items} hrefs={links} />

                {/* Table Component */}
                <div>
                <table className={tables.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>10% Quantity</th>
                            <th>Maximum Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {/* figure out a way to go through specified range to display */}
                            <td>1</td>
                            <td>Item 1</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Item 2</td>
                            <td>$15</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
                </div>

                <div>
                <table className={tables.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {/* figure out a way to go through specified range to display */}
                            <td>1</td>
                            <td>Item 1</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Item 2</td>
                            <td>$15</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
                </div>
                
            </div>
        </main>
    );
}
