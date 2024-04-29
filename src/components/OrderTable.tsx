'use client';
import React, { useEffect, useState, useCallback } from 'react';
import design from '@/app/manager/report_page/page.module.css';
import { format, startOfToday } from 'date-fns';
import { Order, OrderItem } from '@/lib/models';

type TableProp = {
    heading: string[];
};

function OrderTable({ heading }: TableProp) {
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
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(0);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows =
        rowsPerPage === 0
            ? orderHistory
            : orderHistory.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(orderHistory.length / rowsPerPage) || 1;

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

    const handleGenerateOrderHistory = useCallback(async () => {
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
        setCurrentPage(1); // Reset to first page
        setRowsPerPage(res.length); // Set rows per page to all rows by default
    }, [beginTimeString, endTimeString]);

    const handleReset = () => {
        setBeginTimeString(format(startOfToday(), "yyyy-MM-dd'T'00:00"));
        setEndTimeString(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setBeginTime(0);
        setIsOrderHistoryGenerated(false);
        setOrderHistory([]);
        setError(null);
        setCurrentPage(1); // Reset to first page
        setRowsPerPage(0); // Reset rows per page to 0 (display all rows)
    };

    useEffect(() => {
        handleGenerateOrderHistory();
    }, [handleGenerateOrderHistory]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to first page when changing rows per page
    };

    return (
        <div>
            <div style = {{marginBottom: '10px'}}>
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

                <div >
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

            {error && <div className={design.error}>{error}</div>}
            {isLoading ? (
                <div className={design.loadingContainer}>
                    <button className={`${design.loading}`} disabled>
                        Loading...
                    </button>
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
                            {currentRows && currentRows.length > 0 ? (
                                currentRows.map((order, index) => (
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
                                    <td colSpan={6}>No Order History found</td>
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


{/* <div className={design.tableControls}>
                        Rows per page:
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className={design.dropdown}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={orderHistory.length}>All</option>
                        </select>
                    </div>

                    <div className={design.paginationControls}>
                        {totalPages > 1 && (
                            <>
                                {currentPage > 1 && (
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        className={`${design.navbarbutton} ${design.prevButton}`}
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentPage === 1 ? (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            disabled={true}
                                            className={`${design.navbarbutton} ${design.currentButton}`}
                                        >
                                            1
                                        </button>
                                        {totalPages > 2 && (
                                            <span className={design.ellipsis}>
                                                ...
                                            </span>
                                        )}
                                        <button
                                            onClick={() =>
                                                handlePageChange(totalPages)
                                            }
                                            className={design.navbarbutton}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className={design.navbarbutton}
                                        >
                                            1
                                        </button>
                                        {currentPage > 2 && (
                                            <span className={design.ellipsis}>
                                                ...
                                            </span>
                                        )}
                                        <button
                                            onClick={() =>
                                                handlePageChange(currentPage)
                                            }
                                            disabled={true}
                                            className={`${design.navbarbutton} ${design.currentButton}`}
                                        >
                                            {currentPage}
                                        </button>
                                        {currentPage < totalPages && (
                                            <>
                                                {currentPage <
                                                    totalPages - 1 && (
                                                    <span
                                                        className={
                                                            design.ellipsis
                                                        }
                                                    >
                                                        ...
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        handlePageChange(
                                                            totalPages
                                                        )
                                                    }
                                                    className={
                                                        design.navbarbutton
                                                    }
                                                >
                                                    {totalPages}
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                                {currentPage < totalPages && (
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        className={`${design.navbarbutton} ${design.nextButton}`}
                                    >
                                        Next
                                    </button>
                                )}
                            </>
                        )}
                    </div> */}