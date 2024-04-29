'use client';

import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import ScrollableList from '@/components/ScrollableList';
import ScrollableBarGraph from '@/components/ScrollableBarGraph';
import DateRangePicker from '@/components/DatePicker';
//import design from '@/app/manager/report_page/page.module.css';
import { AggregateItem } from '@/lib/models';
import { aggregateInventoryItem } from '@/lib/models';
import { frequentlySoldPairs } from '@/lib/models';
import { format, startOfToday } from 'date-fns';
import {
    useScale,
    ScaleProvider,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '@/app/zoom.client';
const DataPage = () => {
    const [startDate, setStartDate] = useState(startOfToday());
    const [endDate, setEndDate] = useState(new Date());
    const [frequentlySoldPairsData, setFrequentlySoldPairsData] = useState<
        frequentlySoldPairs[]
    >([]);
    const [menuData, setMenuData] = useState<AggregateItem[]>([]);
    const [inventoryData, setInventoryData] = useState<
        aggregateInventoryItem[]
    >([]);
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
                throw new Error(
                    errorData.error || 'An error occurred while fetching data'
                );
            }
            return response.json();
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleGenerateSalesReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(
            `/api/aggregateMenuItems?start=${startDate.getTime()}&end=${endDate.getTime()}`
        );
        if (fetchedData) {
            setMenuData(
                fetchedData.map((item: ItemType) => ({
                    id: item.id,
                    name: item.name,
                    qty: item.qty,
                }))
            );
        }
        setIsLoading(false);
    };

    const handleGenerateProductUsageReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(
            `/api/aggregateInventory?start=${startDate.getTime()}&end=${endDate.getTime()}`
        );
        if (fetchedData) {
            setInventoryData(
                fetchedData.map((item: ItemType) => ({
                    id: item.id,
                    name: item.name,
                    qty: item.qty,
                }))
            );
        }
        setIsLoading(false);
    };

    const handleGenerateWhatSellsTogetherReport = async () => {
        setIsLoading(true);
        const fetchedData = await fetchReportData(
            `/api/getFrequentlySoldPair?start=${startDate.getTime()}&end=${endDate.getTime()}`
        );
        if (fetchedData) {
            setFrequentlySoldPairsData(
                fetchedData.map((pair: PairType) => ({
                    item1Name: pair.item1Name,
                    item2Name: pair.item2Name,
                    frequency: pair.frequency,
                }))
            );
        }
        setIsLoading(false);
    };

    const handleReset = () => {
        setStartDate(startOfToday());
        setEndDate(new Date());
        setFrequentlySoldPairsData([]);
        setMenuData([]);
        setInventoryData([]);
        setError('');
    };

    const resetButtonStyle: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: 'bold',
        position: 'absolute',
        right: '10px',
        margin: '10px',
        padding: '10px',
        cursor: 'pointer',
    };

    const sortedMenuData = menuData.sort((a, b) => b.qty - a.qty);
    const sortedInventoryData = inventoryData.sort((a, b) => b.qty - a.qty);

    const { scale, setScale } = useScale();

    return (
        <ScaleProvider initialScale={1}>
            {/* Scaled content */}

            <main>
                <div
                    style={{
                        width: '100%',
                        maxWidth: '1200px',
                        margin: 'auto',
                        padding: '1rem',
                        position: 'relative',
                        paddingTop: '60px',
                    }}
                >
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />

                    <button
                        onClick={handleGenerateSalesReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Generate Sales Report
                    </button>
                    <button
                        onClick={handleGenerateProductUsageReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Generate Product Usage Report
                    </button>
                    <button
                        onClick={handleGenerateWhatSellsTogetherReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Generate What Sells Together Report
                    </button>

                    <button
                        style={resetButtonStyle}
                        onClick={handleReset}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Reset
                    </button>

                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!isLoading && !error && (
                        <>
                            <div className="report-section">
                                <ScrollableBarGraph
                                    data={sortedMenuData.map((item) => ({
                                        label: item.name,
                                        value: item.qty,
                                        color: 'rgba(205, 50, 75, 1)',
                                    }))}
                                    title="Sales Report"
                                />
                            </div>

                            <div className="report-section">
                                <ScrollableBarGraph
                                    data={sortedInventoryData.map((item) => ({
                                        label: item.name,
                                        value: item.qty,
                                        color: 'rgba(205, 50, 75, 1)',
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
            </main>
            {/* Fixed-position zoom controls */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1001, // Above scaled content
                    textAlign: 'center',
                }}
            >
                <ZoomIn />
                <ZoomOut />
                <ResetZoom />
            </div>
        </ScaleProvider>
    );
};

export default DataPage;
