'use client';

import React from 'react';
import componentStyles from './component.module.css';
import { MenuItem, Order } from '@/lib/models';
import { OrderEntry } from '@/app/cashier/page';

interface CashierOrderTableProps{
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

interface CashierOrderItemProps{
    orderEntry: OrderEntry;
    currentOrder: OrderEntry[];
    setCurrentOrder: (order: OrderEntry[]) => void;
}

// TODO: column headers and total

function CashierOrderTable({currentOrder, setCurrentOrder} : CashierOrderTableProps){
    
    return(
        <div className={componentStyles.orderTable + ' ' + componentStyles.card}>
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
                        return <CashierOrderItem orderEntry={orderEntry} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} key={orderEntry.item.id} />;
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td>{Math.round(currentOrder.reduce((acc, entry) => acc + (entry.item.price * entry.quantity), 0) * 100) / 100}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

function CashierOrderItem({orderEntry, currentOrder, setCurrentOrder} : CashierOrderItemProps){
    function handleClick(){
        const updatedOrder = currentOrder.map((entry) =>{
            if(entry.item.id === orderEntry.item.id){
                return {item: orderEntry.item, quantity: orderEntry.quantity - 1};
            }
            return entry;
        }).filter((entry) => {
            return entry.quantity > 0
        });

        setCurrentOrder(updatedOrder);
    }

    return(
        <tr className={componentStyles.orderEntry}>
            <td>
                <button onClick={handleClick}>X</button>
            </td>
            <td>{orderEntry.item.name}</td>
            <td>{orderEntry.item.price}</td>
            <td>{orderEntry.quantity}</td>
        </tr>
    );
}

export default CashierOrderTable;