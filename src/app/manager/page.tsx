'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Heading from '@/components/Heading'; // Make sure this component is correctly imported
import PageButton from '@/components/PageButton'; // Make sure this component is correctly imported
import SideBar from '@/components/SideBar'; // Make sure this component is correctly imported
import OrderTable from '@/components/OrderTable'; // Make sure this component is correctly imported
import Graph from '@/components/Graph'; // Make sure this component is correctly imported
import styles from '../page.module.css'; // Adjust the path as necessary

interface DataItem {
  name: string; // Replace with the actual property name returned by your API
  qty: number; // Replace with the actual property name returned by your API
}

interface GraphDataItem {
  label: string;
  value: number;
}

const Manager: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<GraphDataItem[]>([]);
  const [menuItemsData, setMenuItemsData] = useState<GraphDataItem[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Replace '/api/aggregateInventory' and '/api/aggregateMenuItems' with your actual API endpoints
  const fetchInventoryData = async () => {
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
      // Handle errors appropriately
    }
  };

  const fetchMenuItemsData = async () => {
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
      // Handle errors appropriately
    }
  };

  const handleRefresh = () => {
    fetchInventoryData();
    fetchMenuItemsData();
  };

  // UI structure
  return (
    <main className={styles.main}>
      <Heading names={['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout']} hrefs={['/', '/menu', '/inventory', '/order-history', '/reports', '/logout']} />
      <SideBar names={['Manager', 'Customer', 'Cashier', 'MenuBoard']} hrefs={['/manager', '/customer', '/cashier', '/menuboards']} />
      <h1>Manager Page</h1>
      <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
      <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
      <PageButton onClick={handleRefresh}>Refresh</PageButton>
      <Graph data={inventoryData} title="Inventory Usage" />
      <Graph data={menuItemsData} title="Menu Item Sales" />
      <OrderTable heading={['TimeStamp', 'Order_Id', 'Discount', 'Total']} rows={[
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2']
      ]} />
    </main>
  );
};

export default Manager;
