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

  // Fetch inventory data
  const fetchInventoryData = async () => {
    const response = await axios.get<DataItem[]>('/api/aggregateInventory', {
      params: { start: new Date(startTime).toISOString(), end: new Date(endTime).toISOString() }
    });
    setInventoryData(response.data.map(item => ({
      label: item.name,
      value: item.qty
    })));
  };

  // Fetch menu items data
  const fetchMenuItemsData = async () => {
    const response = await axios.get<DataItem[]>('/api/aggregateMenuItems', {
      params: { startDate: new Date(startTime).toISOString(), endDate: new Date(endTime).toISOString() }
    });
    setMenuItemsData(response.data.map(item => ({
      label: item.name,
      value: item.qty
    })));
  };

  // Handle the refresh button click
  const handleRefresh = () => {
    fetchInventoryData();
    fetchMenuItemsData();
  };

  // Define navigation items
  const navItems = ['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout'];
  const navLinks = ['/', '/menu', '/inventory', '/order-history', '/reports', '/logout'];
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
