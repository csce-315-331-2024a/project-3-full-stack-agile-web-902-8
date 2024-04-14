'use client'

// Manager.tsx
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
  const [inventoryData, setInventoryData] = useState<GraphDataItem[]>([]);
  const [menuItemsData, setMenuItemsData] = useState<GraphDataItem[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchInventoryData = async () => {
    if (startTime && endTime) {
      try {
        const response = await axios.get<DataItem[]>('/api/aggregateInventory', {
          params: { start: startTime, end: endTime }
        });
        setInventoryData(response.data.map(item => ({
          label: item.name,
          value: item.qty
        })));
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    }
  };

  const fetchMenuItemsData = async () => {
    if (startTime && endTime) {
      try {
        const response = await axios.get<DataItem[]>('/api/aggregateMenuItems', {
          params: { startDate: startTime, endDate: endTime }
        });
        setMenuItemsData(response.data.map(item => ({
          label: item.name,
          value: item.qty
        })));
      } catch (error) {
        console.error('Error fetching menu items data:', error);
      }
    }
  };

  const handleRefresh = () => {
    if (startTime && endTime) {
      fetchInventoryData();
      fetchMenuItemsData();
    } else {
      console.error('Please select both start and end times.');
    }
  };

  return (
    <main className={styles.main}>
      <Heading names={['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout']} hrefs={['/', '/menu', '/inventory', '/order-history', '/reports', '/logout']} />
      <SideBar names={['Manager', 'Customer', 'Cashier', 'MenuBoard']} hrefs={['/manager', '/customer', '/cashier', '/menu-board']} />
      <div className={styles.body}>
        <h1>Manager Page</h1>
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
        <PageButton onClick={handleRefresh}>Refresh</PageButton>
        <Graph data={inventoryData} title="Product Usage" />
        <Graph data={menuItemsData} title="Sales and Sales Together" />
        <OrderTable heading={['TimeStamp', 'Order_Id', 'Discount', 'Total']} rows={[
          ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
          ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2']
        ]} />
      </div>
    </main>
  );
};

export default Manager;
