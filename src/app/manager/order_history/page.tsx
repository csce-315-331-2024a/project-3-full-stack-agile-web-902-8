'use client';

import React, { useEffect, useState } from 'react';
import BarGraph, { BarData } from '@/components/BarGraph';
import ScrollableList from '@/components/ScrollableList';
import ScrollableBarGraph from '@/components/ScrollableBarGraph';
import DateRangePicker from '@/components/DatePicker';


// Assuming these types are defined in the respective modules
import { AggregateItem } from '@/lib/models';
import { aggregateInventoryItem } from '@/lib/models';
import { frequentlySoldPairs } from '@/lib/models';

const DataPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [frequentlySoldPairsData, setFrequentlySoldPairsData] = useState<frequentlySoldPairs[]>([]);
    const [menuData, setMenuData] = useState<AggregateItem[]>([]);
    const [inventoryData, setInventoryData] = useState<aggregateInventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    type ItemType = {
        id: number;
        name: string;
        qty: number;
      };

    type PairType = {
        item1Name: string;
        item2Name: string;
        frequency: number;
    };

    const fetchReportData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while fetching data');
            }
            return response.json();
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleGenerateSalesReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(`/api/aggregateMenuItems?start=${startDate.getTime()}&end=${endDate.getTime()}`);
        if (fetchedData) {
          setMenuData(fetchedData.map((item: ItemType) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
          })));
        }
        setIsLoading(false);
      };
      
      const handleGenerateProductUsageReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(`/api/aggregateInventory?start=${startDate.getTime()}&end=${endDate.getTime()}`);
        if (fetchedData) {
          setInventoryData(fetchedData.map((item: ItemType) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
          })));
        }
        setIsLoading(false);
      };
      
      const handleGenerateWhatSellsTogetherReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(`/api/getFrequentlySoldPair?start=${startDate.getTime()}&end=${endDate.getTime()}`);
        if (fetchedData) {
          setFrequentlySoldPairsData(fetchedData.map((pair: PairType) => ({
            item1Name: pair.item1Name, // replace with actual property name from the response
            item2Name: pair.item2Name, // replace with actual property name from the response
            frequency: pair.frequency,
          })));
        }
        setIsLoading(false);
      };

    const handleReset = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setFrequentlySoldPairsData([]);
        setMenuData([]);
        setInventoryData([]);
        setError('');
    };

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto', padding: '1rem' }}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
    
          <button onClick={handleGenerateSalesReport}>Generate Sales Report</button>
          <button onClick={handleGenerateProductUsageReport}>Generate Product Usage Report</button>
          <button onClick={handleGenerateWhatSellsTogetherReport}>Generate What Sells Together Report</button>
          <button onClick={handleReset}>Reset</button>
    
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!isLoading && !error && (
            <>
              <div className="report-section">
                <ScrollableBarGraph
                  data={menuData.map((item) => ({
                    label: item.name,
                    value: item.qty,
                    color: 'rgba(255,99,132,1)',
                  }))}
                  title="Sales Report"
                />
              </div>
    
              <div className="report-section">
                <ScrollableBarGraph
                  data={inventoryData.map((item) => ({
                    label: item.name,
                    value: item.qty,
                    color: 'rgba(255,99,132,1)', 
                  }))}
                  title="Product Usage"
                />
              </div>
    
              <div className="report-section">
                <ScrollableList
                  items={frequentlySoldPairsData}
                  title="What Sells Together"
                />
              </div>
            </>
          )}
        </div>
      );
    };
    
    export default DataPage;