'use client';

import React, { useEffect } from 'react';
import componentStyles from './component.module.css';
import { MenuItem, Order } from '@/lib/models';
import { OrderEntry } from '@/app/cashier/page';

// TODO: These should be defined elsewhere
const DISCOUNT_RATE = 0.1;
const TAX_RATE = .0825;

interface CashierOrderTableProps {
    isDiscounted: boolean;
    isTaxed: boolean;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

interface CashierOrderItemProps {
    orderEntry: OrderEntry;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

function CashierOrderTable({
    isDiscounted,
    isTaxed,
    currentOrder,
    setCurrentOrder,
}: CashierOrderTableProps) {
    const [discount, setDiscount] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    useEffect(() =>{
        const subTotal = Math.round(currentOrder.reduce((acc, entry) =>acc + entry.item.price * entry.quantity,0) * 100) / 100;
        const calculatedDiscount = Math.round(subTotal * (isDiscounted ? DISCOUNT_RATE : 0) * 100) / 100;
        const calculatedTax = Math.round((subTotal - calculatedDiscount) * (isTaxed ? TAX_RATE : 0) * 100) / 100;
        const calculatedTotal = Math.round((subTotal - calculatedDiscount + calculatedTax) * 100) / 100;

        setDiscount(calculatedDiscount);
        setTax(calculatedTax);
        setTotal(calculatedTotal);
    }, [isDiscounted, isTaxed, currentOrder]);

    return (
        <div
            className={componentStyles.orderTable + ' ' + componentStyles.card}
        >
            <h2>Current order</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrder.map((orderEntry) => {
                        return (
                            <CashierOrderItem
                                orderEntry={orderEntry}
                                currentOrder={currentOrder}
                                setCurrentOrder={setCurrentOrder}
                                key={orderEntry.item.id}
                            />
                        );
                    })}
                    {
                        currentOrder.length === 0 &&
                        <tr>
                            <td></td>
                            <td>No items in order</td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                    {
                        currentOrder.length > 0 && isDiscounted &&
                        <tr>
                            <td></td>
                            <td>Discount:</td>
                            <td>{"-" + discount.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    }
                    {
                        currentOrder.length > 0 && isTaxed &&
                        <tr>
                            <td></td>
                            <td>Tax:</td>
                            <td>{tax.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td>
                            {total.toFixed(2)}
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

function CashierOrderItem({
    orderEntry,
    currentOrder,
    setCurrentOrder,
}: CashierOrderItemProps) {
    function handleClick() {
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

    return (
        <tr className={componentStyles.orderEntry}>
            <td>
                <button onClick={handleClick}>X</button>
            </td>
            <td>{orderEntry.item.name}</td>
            <td>{(Math.round(orderEntry.item.price * orderEntry.quantity * 100) / 100).toFixed(2)}</td>
            <td>{orderEntry.quantity}</td>
        </tr>
    );
}

export default CashierOrderTable;
