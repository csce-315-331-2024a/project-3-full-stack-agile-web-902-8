'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
        setIsCompletingOrder(true);
        try {
            const response = await fetch('/api/markOrderAsFilled', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order.id),
            });

            if (!response.ok) {
                throw new Error('Error: ' + response.statusText);
            }

            console.log('Order completed:', order.id);
        } catch (err) {
            // Only free the button if an error occurs
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
        const milliseconds =
            timeElapsed.hours * 60 * 60 * 1000 +
            timeElapsed.minutes * 60 * 1000 +
            timeElapsed.seconds * 1000;
        setHurry(milliseconds >= 5 * 60 * 1000); // 5 minutes
    }, [timeElapsed]);

    const timeString = `${timeElapsed.hours.toString().padStart(2, '0')}:${timeElapsed.minutes.toString().padStart(2, '0')}:${timeElapsed.seconds.toString().padStart(2, '0')}`;

    return (
        <div
            className={
                'bg-secondary/50 relative p-4 pb-20 rounded-2xl' +
                (hurry ? ' !bg-accent/30' : '')
            }
        >
            <p
                className={
                    'bg-secondary mt-auto w-fit rounded-2xl p-2' +
                    (hurry ? ' text-background !bg-accent' : '')
                }
            >
                {timeString}
            </p>
            <h2>Order #{order.id}</h2>
            <p>{order.status}</p>
            <ul>
                {order.items.map((item) => (
                    <li className='flex justify-between items-center' key={item.item.id}>
                        <span className='w-8 text-right mr-4'>
                            {item.quantity}
                        </span>
                        <span className='flex-grow text-left'>
                            {item.item.name}
                        </span>
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <button
                className={
                    'text-background bg-primary flex justify-center items-center duration-200 absolute bottom-4 left-1/2 translate-x-[-50%] p-4 rounded-2xl hover:bg-primary/70 hover:text-text' +
                    (isCompletingOrder ? ' hover:cursor-wait !bg-primary/30 !text-text' : '')
                }
                onClick={completeOrder}
            >
                Complete
            </button>
        </div>
    );
}
