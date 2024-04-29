// ALL TAILWIND

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/models';
import Link from 'next/link';

export interface OrderEntry {
    item: MenuItem;
    qty: number;
}

export interface OrderItemProp {
    item: MenuItem;
    qty: number;
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

interface OrderSidebarProp {
    children: React.ReactNode;
    currentOrder: OrderEntry[];
    checkoutPage: string;
}

export function CustomerOrderItem({
    item,
    qty,
    currentOrder,
    setCurrentOrder,
}: OrderItemProp) {
    function setQty(qty: number) {
        let newItems = currentOrder
            .map((orderItem) => {
                if (orderItem.item.id == item.id) {
                    return {
                        item: orderItem.item,
                        qty: qty,
                    };
                } else {
                    return orderItem;
                }
            })
            .filter((orderItem) => {
                return orderItem.qty > 0;
            });

        setCurrentOrder(newItems);
    }

    function changeQty(newQty: number) {
        if (newQty > -1 && newQty < 100) {
            setQty(newQty);
        }
    }

    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <div className="h-fit p-[0.75rem_0.75rem_1.50rem_0.75rem] border-2 border-solid border-text grid grid-cols-[repeat(3,1fr)] gap-1">
            <Image
                className="w-24 h-24"
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
            />
            <h3 className="text-center flex justify-center items-center col-[2/span_2]">
                {item.name}
            </h3>
            <p className="col-[1/span_3]">{item.description}</p>
            <div className="flex justify-row items-center col-[1] ">
                <button
                    className="w-6 h-6 flex justify-center items-center text-center border-[1pt] border-solid border-text text-2xl m-[0.25rem_0.1rem] "
                    onClick={() => changeQty(qty - 1)}
                >
                    {qty == 1 ? (
                        <Image
                            className="w-4 h-4 flex justify-center items-center text-center"
                            src="/remove.svg"
                            alt={'remove'}
                            width={32}
                            height={32}
                        />
                    ) : (
                        '-'
                    )}
                </button>
                {/* TODO: Add method for onChange */}
                <p className="w-6 h-6 flex justify-center items-center text-center p-4">
                    {qty}
                </p>
                <button
                    className="w-6 h-6 flex justify-center items-center text-center border-[1px] border-solid border-text text-2xl m-[0.25rem_0.1rem] "
                    onClick={() => changeQty(qty + 1)}
                >
                    +
                </button>
            </div>
            <p className="text-2xl flex justify-center items-center col-[3]">
                ${(item.price * qty).toLocaleString('en-US', options)}
            </p>
        </div>
    );
}

export function CustomerOrderSidebar({
    children,
    currentOrder,
    checkoutPage,
}: OrderSidebarProp) {
    return (
        <div className="border-l-2 border-solid border-l-text h-full w-80">
            <div className="h-4/5 overflow-y-scroll overflow-x-hidden">
                {children}
            </div>
            <Link href={checkoutPage}>
                <button
                    className={
                        'w-full h-1/5 bg-secondary border-2 border-solid border-text text-4xl' +
                        (currentOrder.length === 0 ? ' hidden' : '')
                    }
                    disabled={currentOrder.length === 0}
                >
                    Checkout
                </button>
            </Link>
        </div>
    );
}
