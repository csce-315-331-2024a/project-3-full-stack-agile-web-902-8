'use client';

import React from 'react';
import { OrderEntry } from '@/app/user/cashier/page';

interface CashierOrderTableProps {
    isDiscounted: boolean;
    isTaxed: boolean;
    discount: number;
    tax: number;
    total: number;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
    className?: string;
}

interface CashierOrderItemProps {
    orderEntry: OrderEntry;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
    isEven: boolean;
    className?: string;
}

/**
 * A functional component that renders a table displaying the details of the current order, including discounts, taxes, and total amount.
 * @param props - Properties passed to the component as specified in CashierOrderTableProps.
 * @return A React element representing the current order in a table format with conditional rendering based on whether items are present.
 */
function CashierOrderTable({
    isDiscounted,
    isTaxed,
    discount,
    tax,
    total,
    currentOrder,
    setCurrentOrder,
    className,
}: CashierOrderTableProps) {
    return (
        <div className={'bg-secondary/50 rounded-2xl p-4 ' + className}>
            <h2 className="text-center text-2xl font-bold">Current order</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="w-10 h-10"></th>
                        <th className="text-left">Name</th>
                        <th className="text-right">Price</th>
                        <th className="text-right pr-4">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrder.map((orderEntry, index) => {
                        return (
                            <CashierOrderItem
                                orderEntry={orderEntry}
                                currentOrder={currentOrder}
                                setCurrentOrder={setCurrentOrder}
                                key={orderEntry.item.id}
                                isEven={index % 2 === 0}
                            />
                        );
                    })}
                    {currentOrder.length === 0 && (
                        <tr className="h-10">
                            <td className="rounded-[1rem_0_0_1rem] bg-secondary/50"></td>
                            <td className="text-left bg-secondary/50">
                                No items in order
                            </td>
                            <td className="text-right font-mono bg-secondary/50"></td>
                            <td className="text-right font-mono pr-4 rounded-[0_1rem_1rem_0] bg-secondary/50"></td>
                        </tr>
                    )}
                    {currentOrder.length > 0 && isDiscounted && (
                        <tr className="h-10">
                            <td></td>
                            <td className="text-left">Discount:</td>
                            <td className="text-right font-mono">
                                {'-' + discount.toFixed(2)}
                            </td>
                            <td className="text-right font-mono pr-4"></td>
                        </tr>
                    )}
                    {currentOrder.length > 0 && isTaxed && (
                        <tr className="h-10">
                            <td></td>
                            <td className="text-left">Tax:</td>
                            <td className="text-right font-mono">
                                {tax.toFixed(2)}
                            </td>
                            <td className="text-right font-mono pr-4"></td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr className="h-10">
                        <td></td>
                        <td className="text-left">Total:</td>
                        <td className="text-right font-mono">
                            {total.toFixed(2)}
                        </td>
                        <td className="text-right font-mono pr-4"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

/**
 * A component that displays an individual item within the order table, allowing adjustment of item quantity.
 * @param props - Properties passed to the component as specified in CashierOrderItemProps.
 * @return A React element representing a row in the order table for a single order entry.
 */
function CashierOrderItem({
    orderEntry,
    currentOrder,
    setCurrentOrder,
    isEven,
    className,
}: CashierOrderItemProps) {
    function handleMinus() {
        const updatedOrder = currentOrder
            .map((entry) => {
                if (entry.item.id === orderEntry.item.id) {
                    return {
                        item: orderEntry.item,
                        quantity: orderEntry.quantity - 1,
                    };
                }
                return entry;
            })
            .filter((entry) => {
                return entry.quantity > 0;
            });

        setCurrentOrder(updatedOrder);
    }

    function handlePlus() {
        const updatedOrder = currentOrder
            .map((entry) => {
                if (entry.item.id === orderEntry.item.id) {
                    return {
                        item: orderEntry.item,
                        quantity: orderEntry.quantity + 1,
                    };
                }
                return entry;
            })
            .filter((entry) => {
                return entry.quantity > 0;
            });

        setCurrentOrder(updatedOrder);
    }

    return (
        <tr className={'h-10 ' + className}>
            <td
                className={
                    'rounded-[1rem_0_0_1rem] flex flex-row' +
                    (isEven ? ' bg-secondary/50' : '')
                }
            >
                <button
                    className="rounded-2xl bg-text text-background duration-200 w-6 h-6 m-2 mr-1 hover:bg-background hover:text-text"
                    onClick={handleMinus}
                >
                    -
                </button>
                <button
                    className="rounded-2xl bg-text text-background duration-200 w-6 h-6 m-2 ml-1 hover:bg-background hover:text-text"
                    onClick={handlePlus}
                >
                    +
                </button>
            </td>
            <td className={'text-left ' + (isEven ? ' bg-secondary/50' : '')}>
                {orderEntry.item.name}
            </td>
            <td
                className={
                    'text-right font-mono ' + (isEven ? ' bg-secondary/50' : '')
                }
            >
                {(
                    Math.round(
                        orderEntry.item.price * orderEntry.quantity * 100
                    ) / 100
                ).toFixed(2)}
            </td>
            <td
                className={
                    'text-right font-mono pr-4 rounded-[0_1rem_1rem_0]' +
                    (isEven ? ' bg-secondary/50' : '')
                }
            >
                {orderEntry.quantity}
            </td>
        </tr>
    );
}

export default CashierOrderTable;
