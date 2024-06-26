'use client';

import React, { useEffect, useState } from 'react';
import ScrollableList from '@/components/ScrollableList';
import ScrollableBarGraph from '@/components/ScrollableBarGraph';
import DateRangePicker from '@/components/DatePicker';
//import design from '@/app/manager/report_page/page.module.css';
import { AggregateItem } from '@/lib/models';
import { aggregateInventoryItem } from '@/lib/models';
import { frequentlySoldPairs } from '@/lib/models';
import { format, startOfToday } from 'date-fns';

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

    /**
     * Fetches the data for the report
     * @param url the url for the api
     * @returns the response from the fetch
     */
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

    /**
     * Handles generating the sales report
     */
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

    /**
     * Handles generating the product usage report
     */
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

    /**
     * Handles generating the report for what sells together
     */
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

    /**
     * Handles resetting the reports and graphs
     */
    const handleReset = () => {
        setStartDate(startOfToday());
        setEndDate(new Date());
        setFrequentlySoldPairsData([]);
        setMenuData([]);
        setInventoryData([]);
        setError('');
    };

    const sortedMenuData = menuData.sort((a, b) => b.qty - a.qty);
    const sortedInventoryData = inventoryData.sort((a, b) => b.qty - a.qty);

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden w-full h-full p-4 pb-[70px]">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                Manager Data
            </h1>
            <div className="w-full max-w-[1200px] mx-auto relative pt-4 flex flex-col gap-4 justify-start">
                <div className="relative">
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />

                    <button
                        onClick={handleGenerateSalesReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-4 mt-4 hover:bg-secondary/70"
                    >
                        Generate Sales Report
                    </button>
                    <button
                        onClick={handleGenerateProductUsageReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-4 mt-4 hover:bg-secondary/70"
                    >
                        Generate Product Usage Report
                    </button>
                    <button
                        onClick={handleGenerateWhatSellsTogetherReport}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-4 mt-4 hover:bg-secondary/70"
                    >
                        Generate What Sells Together Report
                    </button>

                    <button
                        onClick={handleReset}
                        //className={design.genresbutton}
                        className="bg-secondary py-2 px-4 text-center font-bold inline-block rounded-xl hover:bg-secondary/70 absolute right-0 bottom-0"
                    >
                        Reset
                    </button>
                </div>

                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && (
                    <>
                        <div className="report-section">
                            <ScrollableBarGraph
                                data={sortedMenuData.map((item) => ({
                                    label: item.name,
                                    value: item.qty,
                                    color: '#f8c10d',
                                }))}
                                title="Sales Report"
                            />
                        </div>

                        <div className="report-section">
                            <ScrollableBarGraph
                                data={sortedInventoryData.map((item) => ({
                                    label: item.name,
                                    value: item.qty,
                                    color: '#ff8427',
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
    );
};

export default DataPage;
