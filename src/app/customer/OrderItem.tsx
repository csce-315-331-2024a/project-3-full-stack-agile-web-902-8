import React from 'react';
import styles from './page.module.css';
import {MenuItem} from '@/lib/models';

interface OrderItemProp {
    item: MenuItem,
    qty: number,
}

function OrderItem({item, qty} : OrderItemProp, onChange: Function) {
    return (
        <div>
            <img/>
            <h3>{item.name}</h3>
            <p>{/*Description*/}</p>

            <button>-</button>
            <input type="number" value="1" onChange={() => onChange(item.name)}/>
            <button>+</button>
        </div>
    )
}

export default OrderItem;
