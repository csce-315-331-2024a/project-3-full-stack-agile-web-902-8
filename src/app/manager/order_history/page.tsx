'use client';

import React, { useEffect, useState } from 'react';
import BarGraph, { BarData } from '@/components/BarGraph';
import ScrollableList from '@/components/ScrollableList';
import ScrollableBarGraph from '@/components/ScrollableBarGraph';
import DateRangePicker from '@/components/DatePicker';
import { formatISO, addSeconds } from 'date-fns';

// Assuming these types are defined in the respective modules
import { getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason } from '@/lib/menu';
import { aggregateMenuItems } from '@/lib/menuBoard';
import { aggregateInventory } from '@/lib/inventory-report';

//THIS MIGHT AS WELL NOT BE NEEDED AS IT SHOULD GENERATE THE NAMES USING THE AGGREGATE FUNCTIONS
const yAxisOrderSales: string[] = [
    // ... array of 24 item names for the Sales Report
];

const yAxisOrderProductUsage: string[] = [
    // ... array of 30 item names for the Product Usage
];

const sortData = (data: BarData[], yAxisOrder: string[]): BarData[] => {
    const sortedData = yAxisOrder.map((label) => {
        const item = data.find((d) => d.label === label);
        return item || { label, value: 0, color: 'rgba(0,0,0,0)' };
    });
    return sortedData;
};

const formatDataForGraph = (
    data: BarData[],
    numberOfColumns: number
): BarData[] => {
    const formattedData = data.slice(0, numberOfColumns);
    while (formattedData.length < numberOfColumns) {
        formattedData.push({ label: '', value: 0, color: 'rgba(0,0,0,0)' });
    }
    return formattedData;
};

const orderAndLimitData = (
    data: BarData[],
    limit: number,
    yAxisOrder: string[]
): BarData[] => {
    const sortedData = sortData(data, yAxisOrder);
    return formatDataForGraph(sortedData, limit);
};

const DataPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [frequentlySoldPairs, setFrequentlySoldPairs] = useState([]);
    const [menuData, setMenuData] = useState<BarData[]>([]);
    const [inventoryData, setInventoryData] = useState<BarData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const pageContainerStyle = {
        width: '100%', // Full width
        maxWidth: '1200px', // Max-width as per your design requirements
        margin: 'auto', // Centers the container
        padding: '1rem', // Padding around the entire content
    };

    const fetchData = async () => {
        setIsLoading(true);
        setError('');

        const formattedStartDate = formatISO(startDate, {
            representation: 'date',
        });
        const formattedEndDate = formatISO(endDate, { representation: 'date' });

        try {
            // Fetch frequently sold pairs for what sells together
            const responseFrequentlySoldPairs = await fetch(
                `/api/getFrequentlySoldPair?begin=${formattedStartDate}&end=${formattedEndDate}`
            );
            if (!responseFrequentlySoldPairs.ok) {
                throw new Error(
                    `Failed to fetch frequently sold pairs: ${responseFrequentlySoldPairs.statusText}`
                );
            }
            const dataFrequentlySoldPairs =
                await responseFrequentlySoldPairs.json();
            setFrequentlySoldPairs(dataFrequentlySoldPairs);

            // API request for aggregated inventory items for product usage
            const resInventory = await fetch(
                `/api/aggregateInventory?start=${startDate.getTime()}&end=${endDate.getTime()}`
            );
            if (!resInventory.ok) {
                throw new Error(
                    `Failed to fetch aggregated inventory data: ${resInventory.statusText}`
                );
            }
            const inventoryJson = await resInventory.json();
            const orderedInventoryData = orderAndLimitData(
                inventoryJson,
                yAxisOrderProductUsage.length,
                yAxisOrderProductUsage
            );
            setInventoryData(orderedInventoryData);

            // API request for aggregated menu items for sales report
            const resMenuItems = await fetch(
                `/api/aggregateMenuItems?beginTime=${startDate.getTime()}&endTime=${endDate.getTime()}`
            );
            if (!resMenuItems.ok) {
                throw new Error(
                    `Failed to fetch aggregated menu items: ${resMenuItems.statusText}`
                );
            }
            const menuItemsJson = await resMenuItems.json();
            const orderedMenuData = orderAndLimitData(
                menuItemsJson,
                yAxisOrderSales.length,
                yAxisOrderSales
            );
            setMenuData(orderedMenuData);
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

    const generateGraph = () => {
        //wont need this
    };

    const refreshData = () => {
        fetchData();
    };

    return (
        <div style={pageContainerStyle}>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            {isLoading && <p>Loading...</p>}
            {!isLoading && !error && (
                <>
                    <div className="report-section">
                        <ScrollableBarGraph
                            data={menuData}
                            title="Sales Report"
                            onGenerateGraph={generateGraph}
                            onRefresh={refreshData}
                        />
                    </div>

                    <div className="report-section">
                        <ScrollableBarGraph
                            data={inventoryData}
                            title="Product Usage"
                            onGenerateGraph={generateGraph}
                            onRefresh={refreshData}
                        />
                    </div>

                    <div className="report-section">
                        <ScrollableList
                            items={frequentlySoldPairs}
                            title="What Sells Together"
                        />
                    </div>

                    <div className="action-buttons">
                        <button onClick={generateGraph}>Generate Graph</button>
                        <button onClick={refreshData}>Refresh</button>
                    </div>
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DataPage;
