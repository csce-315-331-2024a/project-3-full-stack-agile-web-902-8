'use client';
import React, { useState, useEffect } from 'react';
import { format, startOfToday } from 'date-fns';
import { Order } from '@/lib/models';

type TableProp = {
    heading: string[];
};

/**
 * Functional component representing an order table.
 *
 * @param props - The props object containing the table headings.
 * @returns The TSX element representing the order history table.
 */
function OrderTable({ heading }: TableProp) {
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [beginTimeString, setBeginTimeString] = useState<string>(
        format(startOfToday(), "yyyy-MM-dd'T'00:00")
    );
    const [endTimeString, setEndTimeString] = useState<string>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [error, setError] = useState<string | null>(null);
    const [statusFilled, setStatusFilled] = useState(true);
    const [statusPending, setStatusPending] = useState(true);
    const [statusCancelled, setStatusCancelled] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');

    /**
     * Event handler for changing the start time input.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
     */
    const handleBeginTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newBeginTimeString = event.target.value;
        setBeginTimeString(newBeginTimeString);
    };

    /**
     * Event handler for changing the end time input.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
     */
    const handleEndTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newEndTimeString = event.target.value;
        setEndTimeString(newEndTimeString);
    };

    /**
     * Event handler for changing the status filter.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event object.
     */
    const handleStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;
        setSelectedStatus(value);

        switch (value) {
            case 'All':
                setStatusFilled(true);
                setStatusPending(true);
                setStatusCancelled(true);
                break;
            case 'Filled':
                setStatusFilled(true);
                setStatusPending(false);
                setStatusCancelled(false);
                break;
            case 'Pending':
                setStatusFilled(false);
                setStatusPending(true);
                setStatusCancelled(false);
                break;
            case 'Cancelled':
                setStatusFilled(false);
                setStatusPending(false);
                setStatusCancelled(true);
                break;
            default:
                break;
        }
    };

    /**
     * Effect hook for fetching order history based on filters.
     */
    useEffect(() => {
        const handleGenerateOrderHistory = async () => {
            setIsLoading(true);
            const selectedBeginDate = new Date(beginTimeString);
            const selectedEndDate = new Date(endTimeString);
            const beginTimeNumber = selectedBeginDate.getTime();
            const endTimeNumber = selectedEndDate.getTime();

            const response = await fetch(
                `/api/getOrderHistory?beginTime=${beginTimeNumber}&endTime=${endTimeNumber}&statusFilled=${statusFilled}&statusPending=${statusPending}&statusCancelled=${statusCancelled}`
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
        };

        handleGenerateOrderHistory();
    }, [
        statusFilled,
        statusPending,
        statusCancelled,
        beginTimeString,
        endTimeString,
    ]);

    /**
     * Event handler for resetting filters.
     */
    const handleReset = () => {
        setStatusFilled(true);
        setStatusPending(true);
        setStatusCancelled(true);
        setSelectedStatus('All');
        setError(null);
        const resetBeginTime = format(startOfToday(), "yyyy-MM-dd'T'00:00");
        const resetEndTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
        setBeginTimeString(resetBeginTime);
        setEndTimeString(resetEndTime);
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
                    Filter by order status:
                    <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        <option value="All">All</option>
                        <option value="Filled">Filled</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={handleReset}
                        className="bg-secondary py-2 px-4 text-center inline-block text-sm rounded-xl mr-[10px] mt-[10px] hover:bg-secondary/70"
                    >
                        Revert to default settings
                    </button>
                </div>
            </div>
            {error && <div>{error}</div>}
            {isLoading ? (
                <div>
                    <button disabled>Generating Order History...</button>
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
                                    <td
                                        colSpan={6}
                                        className="px-4 py-2 border-b-text border-b-2"
                                    >
                                        No Order History Found
                                    </td>
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
