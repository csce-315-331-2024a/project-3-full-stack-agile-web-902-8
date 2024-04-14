'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import styles from '@/app/page.module.css';
import tables from '@/components/component.module.css';
import { InventoryItem } from '@/lib/models';
import { ExcessItem } from '@/lib/inventory-report';

export default function ReportPage() {
    const items = ['', 'Back'];
    const links = ['/', '/manager'];
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [excessItems, setExcessItems] = useState<ExcessItem[]>([]);
    const [beginTimeString, setBeginTimeString] = useState<string>('');
    const [endTimeString, setEndTimeString] = useState<string>('');
    const [beginTime, setBeginTime] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isExcessReportGenerated, setIsExcessReportGenerated] =
        useState(false);
    const [generateClicked, setGenerateClicked] = useState(false);

    useEffect(() => {
        async function fetchRestockReport() {
            const response = await fetch('/api/getRestockReport');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const res = await response.json();
            setInventoryItems(res);
        }
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
            return;
        }
        const res = await response.json();
        setExcessItems(res);
        setBeginTime(beginTimeNumber);
        setError(null);
        setIsExcessReportGenerated(true);
        setGenerateClicked(false);
    };

    const handleReset = () => {
        setBeginTimeString('');
        setEndTimeString('');
        setBeginTime(0);
        setIsExcessReportGenerated(false);
        setExcessItems([]);
    };

    return (
        <main className={`${styles.main} ${tables.reportGrid}`}>
            <div className={styles.description}>
                <Heading names={items} hrefs={links} />

                <div className={tables.excessReport}>
                    <h1>Excess Report:</h1>

                    {error && <div className={styles.error}>{error}</div>}

                    <div>
                        <label htmlFor="beginTime">Select a begin date: </label>
                        <input
                            type="datetime-local"
                            id="beginTime"
                            value={beginTimeString}
                            onChange={handleBeginTimeChange}
                            className={tables.dateInput}
                        />
                        <label htmlFor="endTime">Select an end date: </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTimeString}
                            onChange={handleEndTimeChange}
                            className={tables.dateInput}
                        />
                    </div>

                    <div>
                        <button
                            onClick={handleGenerateExcessReport}
                            className={tables.genresbutton}
                        >
                            Generate Excess Report
                        </button>
                        <button
                            onClick={handleReset}
                            className={tables.genresbutton}
                        >
                            Reset
                        </button>
                    </div>

                    {isExcessReportGenerated && (
                        <table className={tables.reportTable}>
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
                                            No excess items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className={tables.restockReport}>
                    <h1>Restock Report:</h1>
                    <table className={tables.reportTable}>
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
                </div>
            </div>
        </main>
    );
}
