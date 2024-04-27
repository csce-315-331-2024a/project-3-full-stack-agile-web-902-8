'use client';

import React, { useEffect, useState } from 'react';
import BarGraph, { BarData } from '@/components/BarGraph';
import ScrollableList from '@/components/ScrollableList';
import ScrollableBarGraph from '@/components/ScrollableBarGraph';
import DateRangePicker from '@/components/DatePicker';
import { formatISO, addSeconds } from 'date-fns';

// Assuming these types are defined in the respective modules
import { AggregateItem } from '@/lib/models';
import { aggregateInventoryItem } from '@/lib/models';
import { frequentlySoldPairs } from '@/lib/models';

const DataPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [frequentlySoldPairs, setFrequentlySoldPairs] = useState<
        frequentlySoldPairs[]
    >([]);
    const [menuData, setMenuData] = useState<AggregateItem[]>([]);
    const [inventoryData, setInventoryData] = useState<
        aggregateInventoryItem[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Fetch frequently sold pairs for what sells together
            const resPairs = await fetch(
                `/api/getFrequentlySoldPair?begin=${startDate.getTime()}&end=${endDate.getTime()}`
            );
            if (!resPairs.ok) {
                const errorData = await resPairs.json();
                setError(errorData.error);
                setFrequentlySoldPairs([]);
                setIsLoading(false);
                return;
            }
            const res = await resPairs.json();
            setFrequentlySoldPairs(res);

            // API request for aggregated inventory items for product usage
            const resInventory = await fetch(
                `/api/aggregateInventory?start=${startDate.getTime()}&end=${endDate.getTime()}`
            );
            if (!resInventory.ok) {
                const errorData = await resInventory.json();
                setError(errorData.error);
                setInventoryData([]);
                setIsLoading(false);
            }
            const res2 = await resInventory.json();
            setInventoryData(res2);

            // API request for aggregated menu items for sales report
            const resMenuItems = await fetch(
                `/api/aggregateMenuItems?beginTime=${startDate.getTime()}&endTime=${endDate.getTime()}`
            );
            if (!resMenuItems.ok) {
                const errorData = await resMenuItems.json();
                setError(errorData.error);
                setMenuData([]);
                setIsLoading(false);
            }
            const res3 = await resMenuItems.json();
            setMenuData(res3);
        } catch (error) {
            if (error instanceof Error) {
                setError(`Error: ${error.message}`);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '1200px',
                margin: 'auto',
                padding: '1rem',
            }}
        >
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            {isLoading && <p>Loading...</p>}
            {!isLoading && !error && (
                <>
                    {/* Sales Report Section */}
                    <div className="report-section">
                        <ScrollableBarGraph
                            data={menuData.map((aggregateMenuItems) => ({
                                label: aggregateMenuItems.name,
                                value: aggregateMenuItems.qty,
                                color: 'rgba(75,192,192,1)', // Example color
                            }))}
                            title="Sales Report"
                        />
                    </div>

                    {/* Product Usage Section */}
                    <div className="report-section">
                        <ScrollableBarGraph
                            data={inventoryData.map((aggregateInventory) => ({
                                label: aggregateInventory.name,
                                value: aggregateInventory.qty,
                                color: 'rgba(255,99,132,1)', // Example color
                            }))}
                            title="Product Usage"
                        />
                    </div>

                    {/* What Sells Together Section */}
                    <div className="report-section">
                        <ScrollableList
                            items={frequentlySoldPairs}
                            title="What Sells Together"
                        />
                    </div>
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DataPage;
