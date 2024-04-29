'use client';
import React, { useState, useCallback } from 'react';
import { format, startOfToday } from 'date-fns';
import { Order } from '@/lib/models';

type TableProp = {
    heading: string[];
};

/**
 * Represents a table component for displaying order history.
 * @component
 * @param {string[]} heading - An array of strings representing the table headings.
 */
function OrderTable({ heading }: TableProp) {
    /**
     * Stating variables
     */
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [beginTimeString, setBeginTimeString] = useState<string>(
        format(startOfToday(), "yyyy-MM-dd'T'00:00")
    );
    const [endTimeString, setEndTimeString] = useState<string>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles the change event when the user selects a new starting date and time.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleBeginTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setBeginTimeString(event.target.value);
    };

    /**
     * Handles the change event when the user selects a new ending date and time.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleEndTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndTimeString(event.target.value);
    };

    /**
     * Fetches order history data from the server based on the selected date range.
     */
    const handleGenerateOrderHistory = useCallback(async () => {
        setIsLoading(true);
        const selectedBeginDate = new Date(beginTimeString);
        const selectedEndDate = new Date(endTimeString);
        const beginTimeNumber = selectedBeginDate.getTime();
        const endTimeNumber = selectedEndDate.getTime();

        const response = await fetch(
            `/api/getOrderHistory?beginTime=${beginTimeNumber}&endTime=${endTimeNumber}`
        );
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
            setOrderHistory([]);
            setIsLoading(false);
            return;
        }
        const res = await response.json();
        setOrderHistory(res);
        setError(null);
        setIsLoading(false);
    }, [beginTimeString, endTimeString]);

    /**
     * Resets the selected date range and clears the order history data.
     */
    const handleReset = () => {
        setBeginTimeString(format(startOfToday(), "yyyy-MM-dd'T'00:00"));
        setEndTimeString(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setOrderHistory([]);
        setError(null);
    };

    /**
     * Renders the component.
     */
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <div>
                    Select a starting date:
                    <input
                        type="datetime-local"
                        id="beginTime"
                        value={beginTimeString}
                        onChange={handleBeginTimeChange}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    />
                </div>

                <div>
                    Select an end date:
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTimeString}
                        onChange={handleEndTimeChange}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    />
                </div>
                <div>
                    <button
                        onClick={handleGenerateOrderHistory}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Generate Order History
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {error && <div>{error}</div>}
            {isLoading ? (
                <div>
                    <button disabled>Loading...</button>
                </div>
            ) : (
                <>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                {heading.map((item, index) => (
                                    <th
                                        className={
                                            'bg-primary text-background text-left px-4 py-2' +
                                            (index === 0
                                                ? ' rounded-tl-2xl'
                                                : '') +
                                            (index === heading.length - 1
                                                ? ' rounded-tr-2xl'
                                                : '')
                                        }
                                        key={index}
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.length > 0 ? (
                                orderHistory.map((order, index) => (
                                    <tr
                                        className="hover:bg-secondary/70"
                                        key={index}
                                    >
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.id}
                                        </td>
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.timestamp.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.discount !== 0
                                                ? order.discount
                                                : 'N/A'}
                                        </td>
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.total}
                                        </td>
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.items.map(
                                                (item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        Item ID:{' '}
                                                        {item.item.name},
                                                        Quantity:{' '}
                                                        {item.quantity}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border-b-text border-b-2">
                                            {order.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-2 border-b-text border-b-2"></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default OrderTable;
