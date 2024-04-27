import React, { useEffect, useState } from 'react';
import design from '@/app/manager/report_page/page.module.css';
import { format, startOfToday } from 'date-fns';
import { Order, OrderItem } from '@/lib/models';

function OrderTable() {
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [isOrderHistoryGenerated, setIsOrderHistoryGenerated] =
        useState(false);
    const [generateClicked, setGenerateClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [beginTimeString, setBeginTimeString] = useState<string>(
        format(startOfToday(), "yyyy-MM-dd'T'00:00")
    );
    const [endTimeString, setEndTimeString] = useState<string>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [, setBeginTime] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

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

    const handleGenerateOrderHistory = async () => {
        setGenerateClicked(true);
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
            setIsOrderHistoryGenerated(false);
            setIsLoading(false);
            return;
        }
        const res = await response.json();
        setOrderHistory(res);
        setBeginTime(beginTimeNumber);
        setError(null);
        setIsOrderHistoryGenerated(true);
        setGenerateClicked(false);
        setIsLoading(false);
    };

    const handleReset = () => {
        setBeginTimeString(format(startOfToday(), "yyyy-MM-dd'T'00:00"));
        setEndTimeString(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setBeginTime(0);
        setIsOrderHistoryGenerated(false);
        setOrderHistory([]);
        setError(null);
    };

    // useEffect(() => {
    //     handleGenerateOrderHistory();
    // }, []); 


    return (
        <div className={design.excessReport}>
            <div>
                <div>
                    <label htmlFor="beginTime">Select a starting date:</label>
                    <input
                        type="datetime-local"
                        id="beginTime"
                        value={beginTimeString}
                        onChange={handleBeginTimeChange}
                        className={design.dateInput}
                    />
                </div>
                <div>
                    <label htmlFor="endTime">Select an end date:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTimeString}
                        onChange={handleEndTimeChange}
                        className={design.dateInput}
                    />
                </div>
                <div>
                    {' '}
                    <button
                        onClick={handleGenerateOrderHistory}
                        className={design.genresbutton}
                    >
                        Generate Order History
                    </button>
                    <button
                        onClick={handleReset}
                        className={design.genresbutton}
                    >
                        Reset
                    </button>
                </div>
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
                            <th>Order ID</th>
                            <th>Timestamp</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th>Ordered Items</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory && orderHistory.length > 0 ? (
                            orderHistory.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{order.timestamp.toLocaleString()}</td>
                                    <td>{order.discount}</td>
                                    <td>{order.total}</td>
                                    <td>{order.status}</td>





                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No excess items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderTable;
