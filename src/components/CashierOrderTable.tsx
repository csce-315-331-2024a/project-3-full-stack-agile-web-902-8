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
        <div>
            <h2>Current order</h2>
            <ul>
                {currentOrder.map((orderEntry) => {
                    return <CashierOrderItem orderEntry={orderEntry} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} key={orderEntry.item.id} />;
                })}
            </ul>
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
        <li>
            <button onClick={handleClick}>X</button>
            <p>{orderEntry.item.name}</p>
            <p>{orderEntry.item.price}</p>
            <p>{orderEntry.quantity}</p>
        </li>
    );
}

export default CashierOrderTable;