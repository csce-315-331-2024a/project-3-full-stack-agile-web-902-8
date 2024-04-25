'use client';

import React, { useCallback, useEffect, useState } from 'react';
import componentStyles from '@/components/component.module.css';
import { Order } from '@/lib/models';

interface KitchenGridItemProps {
    order: Order;
}

export default function KitchenGridItem({ order }: KitchenGridItemProps) {
    const calculateTimeElapsed = useCallback(() => {
        const orderTime = new Date(order.timestamp).getTime();
        const currentTime = Date.now();
        const timeDifference = currentTime - orderTime;

        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

        return { hours, minutes, seconds };
    }, [order.timestamp]);

    const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());
    const [hurry, setHurry] = useState(false);
    const [isCompletingOrder, setIsCompletingOrder] = useState(false);

    async function completeOrder() {
        // Implement this function to update the order status to 'Completed'
        // and remove it from the grid
        setIsCompletingOrder(true);
        try{
            const response = await fetch('/api/markOrderAsFilled', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order.id),
            });

            if(!response.ok){
                throw new Error('Error: ' + response.statusText);
            }

            console.log('Order completed:', order.id);
        }
        catch(err){ // Only free the button if an error occurs
            setIsCompletingOrder(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(calculateTimeElapsed());
        }, 1000);
        return () => clearInterval(interval);
    }, [calculateTimeElapsed]);

    useEffect(() => {
        const milliseconds = timeElapsed.hours * 60 * 60 * 1000 + timeElapsed.minutes * 60 * 1000 + timeElapsed.seconds * 1000;
        setHurry(milliseconds >= 5 * 60 * 1000); // 5 minutes
    }, [timeElapsed]);

    const timeString = `${timeElapsed.hours.toString().padStart(2, '0')}:${timeElapsed.minutes.toString().padStart(2, '0')}:${timeElapsed.seconds.toString().padStart(2, '0')}`;

    return (
        <div
            className={
                componentStyles.kitchenGridItem +
                ' ' +
                componentStyles.card +
                (hurry ? ' ' + componentStyles.hurry : '')
            }
        >
            <p
                className={
                    componentStyles.kitchenGridTimer +
                    (hurry ? ' ' + componentStyles.hurry : '')
                }
            >
                {timeString}
            </p>
            <h2>Order #{order.id}</h2>
            <p>{order.status}</p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.item.id}>
                        <span className={componentStyles.kitchenGridQuantity}>
                            {item.quantity}
                        </span>
                        <span className={componentStyles.kitchenGridItemName}>
                            {item.item.name}
                        </span>
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <button
                className={
                    componentStyles.completeOrder + ' ' + componentStyles.card + (isCompletingOrder ? ' ' + componentStyles.disabled : '')
                }
                onClick={completeOrder}
            >
                Complete
            </button>
        </div>
    );
}
