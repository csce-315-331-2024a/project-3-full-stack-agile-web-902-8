'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import SideBar from '@/components/SideBar';
import OrderTable from '@/components/OrderTable';
import Graph from '@/components/Graph';
import styles from '../page.module.css';

// Replace these interfaces with the actual structure of your API response
interface DataItem {
  name: string;
  qty: number;
}

interface GraphDataItem {
  label: string;
  value: number;
}

const Manager: React.FC = () => {
  // State for handling API response for graphs
  const [inventoryData, setInventoryData] = useState<GraphDataItem[]>([]);
  const [menuItemsData, setMenuItemsData] = useState<GraphDataItem[]>([]);
  
  // State for date range inputs
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchInventoryData = async () => {
    if (startTime && endTime) {
      try {
        const response = await axios.get<DataItem[]>('/api/aggregateInventory', {
          params: { start: new Date(startTime).toISOString(), end: new Date(endTime).toISOString() }
        });
        setInventoryData(response.data.map(item => ({
          label: item.name,
          value: item.qty
        })));
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        // Add your error handling here
      }
    }
  };
  
  const fetchMenuItemsData = async () => {
    if (startTime && endTime) {
      try {
        const response = await axios.get<DataItem[]>('/api/aggregateMenuItems', {
          params: { startDate: new Date(startTime).toISOString(), endDate: new Date(endTime).toISOString() }
        });
        setMenuItemsData(response.data.map(item => ({
          label: item.name,
          value: item.qty
        })));
      } catch (error) {
        console.error('Error fetching menu items data:', error);
        // Add your error handling here
      }
    }
  };
  
  const handleRefresh = () => {
    if (startTime && endTime) {
      fetchInventoryData();
      fetchMenuItemsData();
    } else {
      console.error('Please select both start and end times.');
      // You may want to display this message to the user
    }
  };
  
  // ... rest of your component
  

/**
 *    const Items = [
        'Home',
        'Menu',
        'Inventory',
        'Order History',
        'Reports',
        'Logout',
    ];
    const Links = [
        '/manager',
        '/manager',
        '/manager',
        '/manager',
        '/manager/report_page',
        '/',
    ];
    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];
    const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];
 */

  // Define navigation items
  const navItems = ['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout'];
  const navLinks = [
    '/manager',
    '/manager',
    '/manager',
    '/manager',
    '/manager/report_page',
    '/',
];
  const sidebarItems = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
  const sidebarLinks = ['/manager', '/customer', '/cashier', '/menu-board'];
  
  // Define table data
  const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
  const tableBody = [
      ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
      ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
  ];

  return (
    <main className={styles.main}>
      <Heading names={navItems} hrefs={navLinks} />
      <SideBar names={sidebarItems} hrefs={sidebarLinks} />
      <div className={styles.body}>
        <h1>Manager Page</h1>
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
        <PageButton onClick={handleRefresh}>Refresh</PageButton>
        <Graph data={inventoryData} title="Inventory Usage" />
        <Graph data={menuItemsData} title="Menu Item Sales" />
        <OrderTable heading={tableHead} rows={tableBody} />
      </div>
    </main>
  );
};

export default Manager;
