'use client';
import React, { useEffect, useState } from 'react';
import { InventoryItem } from '@/lib/models';
import { ExcessItem } from '@/lib/inventory-report';
import { format, startOfToday } from 'date-fns';
import {
    useScale,
    ScaleProvider,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '@/app/zoom.client';
/**
 * Generates the report page
 * @returns The report page
 */
export default function ReportPage() {
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
        /**
         * Fetches the restock report
         */
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

    /**
     * Handles a change in the begin time
     * @param event The input element that was changed
     */
    const handleBeginTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setBeginTimeString(event.target.value);
    };

    /**
     * Handles a change in the end time
     * @param event The input element that was changed
     */
    const handleEndTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndTimeString(event.target.value);
    };

    /**
     * Handles generating the excess report
     */
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

    /**
     * Handles resetting the page
     */
    const handleReset = () => {
        setBeginTimeString(format(startOfToday(), "yyyy-MM-dd'T'00:00"));
        setEndTimeString(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setBeginTime(0);
        setIsExcessReportGenerated(false);
        setExcessItems([]);
        setError(null);
    };

    const { scale, setScale } = useScale();
    return (
        <ScaleProvider initialScale={1}>
            {/* Scaled content */}
            <div
                id="scaled-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    overflow: 'auto',
                }}
            ></div>
            <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden grid grid-cols-[3fr_1fr] grid-rows-[min-content_1fr] p-4 gap-4">
                <h1 className="col-[1/3] row-[1/2] text-[4rem] font-bold relative mainHeader w-fit h-fit">
                    Reports
                </h1>
                <div className="col-[1/2] row-[2/3]">
                    <h2 className="text-2xl font-bold">Excess Report:</h2>
                    <div>
                        <label htmlFor="beginTime">
                            Select a starting date:{' '}
                        </label>
                        <input
                            type="datetime-local"
                            id="beginTime"
                            value={beginTimeString}
                            onChange={handleBeginTimeChange}
                            className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
                        />
                        <label htmlFor="endTime">Select an end date: </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTimeString}
                            onChange={handleEndTimeChange}
                            className="bg-secondary py-2 px-3 rounded-xl text-sm mr-[10px] mt-[10px] hover:cursor-pointer hover:bg-secondary/70"
                        />
                        <button
                            onClick={handleGenerateExcessReport}
                            className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                        >
                            Generate Excess Report
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                        >
                            Reset
                        </button>
                    </div>

                    {error && <div className="mt-5">{error}</div>}

                    {isLoading ? (
                        <div className="flex justify-center items-center h-[300px] mt-8">
                            <button
                                className="text-background bg-text hover:cursor-wait py-4 px-8 text-xl rounded-2xl"
                                disabled
                            >
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <table className="w-full border-collapse mt-5 text-sm">
                            <thead>
                                <tr>
                                    <th className="bg-accent text-background font-bold text-left py-3 px-4 rounded-tl-2xl">
                                        Inventory
                                    </th>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4">
                                        Quantity used
                                    </th>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4">
                                        Quantity in store
                                    </th>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4">
                                        Minimum quantity
                                    </th>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4 rounded-tr-2xl">
                                        Maximum quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {excessItems && excessItems.length > 0 ? (
                                    excessItems.map((excessItem, index) => (
                                        <tr
                                            className="hover:bg-secondary/70"
                                            key={index}
                                        >
                                            <td className="py-3 px-4 border-b-text border-b-[1px]">
                                                {excessItem.item.name}
                                            </td>
                                            <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                                {excessItem.qtyUsed}
                                            </td>
                                            <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                                {excessItem.item.quantity}
                                            </td>
                                            <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                                {excessItem.item.minQuantity}
                                            </td>
                                            <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                                {excessItem.item.maxQuantity}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="hover:bg-secondary/70">
                                        <td
                                            className="py-3 px-4 border-b-text border-b-[1px]"
                                            colSpan={5}
                                        >
                                            {' '}
                                            No excess items found{' '}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="col-[2/3] row-[2/3]">
                    <h2 className="text-2xl font-bold">Restock Report:</h2>
                    {isRestockReportLoading ? (
                        <div className="flex justify-center items-center h-[300px] mt-8">
                            <button
                                className="text-background bg-text hover:cursor-wait py-4 px-8 text-xl rounded-2xl"
                                disabled
                            >
                                Loading...
                            </button>
                        </div>
                    ) : (
                        <table className="w-full border-collapse mt-5 text-sm">
                            <thead>
                                <tr>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4 rounded-tl-2xl">
                                        ID
                                    </th>
                                    <th className="bg-accent text-background font-bold text-left py-3 px-4">
                                        Name
                                    </th>
                                    <th className="bg-accent text-background font-bold text-right py-3 px-4 rounded-tr-2xl">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryItems.map((item, index) => (
                                    <tr
                                        className="hover:bg-secondary/70"
                                        key={index}
                                    >
                                        <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                            {item.id}
                                        </td>
                                        <td className="py-3 px-4 border-b-text border-b-[1px]">
                                            {item.name}
                                        </td>
                                        <td className="text-right font-mono py-3 px-4 border-b-text border-b-[1px]">
                                            {item.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {/* Fixed-position zoom controls */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    bottom: '10px',
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
}
