'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import design from '@/app/manager/report_page/page.module.css';
import { InventoryItem } from '@/lib/models';
import { ExcessItem } from '@/lib/inventory-report';
import { format, startOfToday } from 'date-fns';

export default function ReportPage() {
    const Items = [
        'Home',
        'Menu',
        'Inventory',
        'Manager Data',
        'Reports',
        'Logout',
    ];
    const Links = [
        '/manager',
        '/manager',
        '/manager/inventory',
        '/manager/order_history',
        '/manager/report_page',
        '/',
    ];
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [excessItems, setExcessItems] = useState<ExcessItem[]>([]);
    const [beginTimeString, setBeginTimeString] = useState<string>(
        format(startOfToday(), "yyyy-MM-dd'T'00:00")
    );
    const [endTimeString, setEndTimeString] = useState<string>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [, setBeginTime] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isExcessReportGenerated, setIsExcessReportGenerated] =
        useState(false);
    const [generateClicked, setGenerateClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRestockReportLoading, setIsRestockReportLoading] = useState(false);

    useEffect(() => {
        const fetchRestockReport = async () => {
            setIsRestockReportLoading(true);
            try {
                const response = await fetch('/api/getRestockReport');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const res = await response.json();
                setInventoryItems(res);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsRestockReportLoading(false);
            }
        };
        fetchRestockReport();
    }, []);

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

    const handleGenerateExcessReport = async () => {
        setGenerateClicked(true);
        setIsLoading(true);
        const selectedBeginDate = new Date(beginTimeString);
        const selectedEndDate = new Date(endTimeString);
        const beginTimeNumber = selectedBeginDate.getTime();
        const endTimeNumber = selectedEndDate.getTime();

        const response = await fetch(
            `/api/getExcessReport?beginTime=${beginTimeNumber}&endTime=${endTimeNumber}`
        );
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
            setExcessItems([]);
            setIsExcessReportGenerated(false);
            setIsLoading(false);
            return;
        }
        const res = await response.json();
        setExcessItems(res);
        setBeginTime(beginTimeNumber);
        setError(null);
        setIsExcessReportGenerated(true);
        setGenerateClicked(false);
        setIsLoading(false);
    };

    const handleReset = () => {
        setBeginTimeString(format(startOfToday(), "yyyy-MM-dd'T'00:00"));
        setEndTimeString(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setBeginTime(0);
        setIsExcessReportGenerated(false);
        setExcessItems([]);
        setError(null);
    };

    return (
        <main>
            <Heading names={Items} hrefs={Links} />

            <div className={design.reportContainer}>
                <div className={design.excessReport}>
                    <h1>Excess Report:</h1>

                    <div>
                        <label htmlFor="beginTime">
                            Select a starting date:{' '}
                        </label>
                        <input
                            type="datetime-local"
                            id="beginTime"
                            value={beginTimeString}
                            onChange={handleBeginTimeChange}
                            className={design.dateInput}
                        />
                        <label htmlFor="endTime">Select an end date: </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTimeString}
                            onChange={handleEndTimeChange}
                            className={design.dateInput}
                        />
                        <button
                            onClick={handleGenerateExcessReport}
                            className={design.genresbutton}
                        >
                            Generate Excess Report
                        </button>
                        <button
                            onClick={handleReset}
                            className={design.genresbutton}
                        >
                            Reset
                        </button>
                    </div>

                    {error && <div className={design.error}>{error}</div>}

                    {isLoading ? (
                        <div className={design.loadingContainer}>
                            <button className={`${design.loading}`} disabled>
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <table className={design.reportTable}>
                            <thead>
                                <tr>
                                    <th>Inventory</th>
                                    <th>Quantity used</th>
                                    <th>Quantity in store</th>
                                    <th>Minimum quantity</th>
                                    <th>Maximum quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {excessItems && excessItems.length > 0 ? (
                                    excessItems.map((excessItem, index) => (
                                        <tr key={index}>
                                            <td>{excessItem.item.name}</td>
                                            <td>{excessItem.qtyUsed}</td>
                                            <td>{excessItem.item.quantity}</td>
                                            <td>
                                                {excessItem.item.minQuantity}
                                            </td>
                                            <td>
                                                {excessItem.item.maxQuantity}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>
                                            {' '}
                                            No excess items found{' '}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className={design.restockReport}>
                    <h1>Restock Report:</h1>
                    {isRestockReportLoading ? (
                        <div className={design.loadingContainer}>
                            <button className={`${design.loading}`} disabled>
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <table className={design.reportTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}
