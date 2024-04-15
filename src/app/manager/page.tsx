'use client';
import React, { useState } from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import OrderTable from '@/components/OrderTable';
import styles from '../page.module.css';
import tables from '@/components/component.module.css';

export default function Manager() {
    const headerItems = [
        'Home',
        'Menu',
        'Inventory',
        'Order History',
        'Reports',
        'Logout',
    ];
    const headerLinks = [
        '/manager',
        '/manager',
        '/manager',
        '/manager',
        '/manager/report_page',
        '/',
    ];
    const sidebarItems = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const sidebarLinks = ['/manager', '/customer', '/cashier', '/menu-boards'];
    const orderTableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const orderTableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    // State for sales reports
    const [menuSales, setMenuSales] = useState([]);
    const [inventorySales, setInventorySales] = useState([]);
    const [beginTimeString, setBeginTimeString] = useState('');
    const [endTimeString, setEndTimeString] = useState('');
    const [error, setError] = useState(null);

    const handleBeginTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setBeginTimeString(event.target.value);
    };

    const handleEndTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndTimeString(event.target.value);
    };

    const fetchSalesData = async () => {
        const beginTime = new Date(beginTimeString).getTime();
        const endTime = new Date(endTimeString).getTime();

        // Fetching sales report for menu items
        const menuResponse = await fetch(
            `/api/aggregateMenuItems?beginTime=${beginTime}&endTime=${endTime}`
        );
        if (!menuResponse.ok) {
            throw new Error('Error fetching menu sales data');
        }
        const menuData = await menuResponse.json();
        setMenuSales(menuData);

        // Fetching sales report for inventory items
        const inventoryResponse = await fetch(
            `/api/aggregateInventory?start=${beginTime}&end=${endTime}`
        );
        if (!inventoryResponse.ok) {
            throw new Error('Error fetching inventory sales data');
        }
        const inventoryData = await inventoryResponse.json();
        setInventorySales(inventoryData);

        setError(null);
    };

    return (
        <main className={styles.main}>
          <div className={styles.description}>
            <Heading names={headerItems} hrefs={headerLinks} />
            <DoubleText
              block1={<SideBar names={sidebarItems} hrefs={sidebarLinks} />}
              block2={
                <div>
                  <h1>Manager Page</h1>
                  <PageButton>Refresh</PageButton>
                  <OrderTable
                    heading={orderTableHead}
                    rows={orderTableBody}
                  />
                  {/* Sales Reports Section */}
                  <div className={styles.dateSelectionContainer}> {/* New div for date selection */}
                    <label htmlFor="beginTime" className={styles.dateInputLabel}>
                      Select a begin date:{' '}
                    </label>
                    <input
                      type="datetime-local"
                      id="beginTime"
                      value={beginTimeString}
                      onChange={handleBeginTimeChange}
                      className={tables.dateInput}
                    />
                    <label htmlFor="endTime" className={styles.dateInputLabel}>
                      Select an end date:{' '}
                    </label>
                    <input
                      type="datetime-local"
                      id="endTime"
                      value={endTimeString}
                      onChange={handleEndTimeChange}
                      className={tables.dateInput}
                    />
                    <button
                      onClick={fetchSalesData}
                      className={tables.genresButton}
                    >
                      Generate Sales Report
                    </button>
                    {error && (
                      <p className={styles.error}>{error}</p>
                    )}
                  </div>
                  <h2>Menu Items Sales</h2>
                  {/* ... Table headers and body for menuSales ... */}
                  <h2>Inventory Items Sales</h2>
                  {/* ... Table headers and body for inventorySales ... */}
                </div>
              }
            />
          </div>
        </main>
      );
}