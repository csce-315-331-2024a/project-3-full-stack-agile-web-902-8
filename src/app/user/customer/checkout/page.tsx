'use client';

import {
    OrderEntry,
    CustomerOrderItem,
} from '@/components/CustomerOrderSidebar';
import {
    MenuItem,
    Ingredient,
    InventoryItem,
    Seasonal,
    Order,
    OrderItem,
} from '@/lib/models';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Popup from '@/components/Popup';

import GlobalConfig from '@/lib/config';

export default function CustomerCheckout() {
    const router = useRouter();

    const [currentOrder, changeCurrentOrder] = useState<OrderEntry[]>([]);

    const [subTotal, setSubTotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');

    // wrapper around setting the current order
    function setCurrentOrder(currentOrder: OrderEntry[]) {
        localStorage.setItem('customer-order', JSON.stringify(currentOrder));
        changeCurrentOrder(currentOrder);
    }

    useEffect(() => {
        // grab the order from local storage if it exists
        let serializedOrder = localStorage.getItem('customer-order');
        let order = [];
        if (serializedOrder != null) {
            order = JSON.parse(serializedOrder);
        }
        changeCurrentOrder(order);
    }, []);

    useEffect(() => {
        const subTotal =
            Math.round(
                currentOrder.reduce(
                    (acc, entry) => acc + entry.item.price * entry.qty,
                    0
                ) * 100
            ) / 100;

        const taxAmt = subTotal * GlobalConfig.rates.tax;

        const total = subTotal + taxAmt;

        setSubTotal(subTotal);
        setTax(taxAmt);
        setTotal(total);
    }, [currentOrder]);

    async function placeOrder(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (currentOrder.length === 0) {
            console.log('No items in order');
            return;
        }

        console.log('Redirecting user to customer menu page');
        router.push('/user/customer/order-placed');

        setIsPlacingOrder(true);
        try {
            const id = 0;
            const timestamp = new Date();
            const items = currentOrder.map(
                (orderEntry) => new OrderItem(orderEntry.qty, orderEntry.item)
            );
            const order = new Order(id, timestamp, 0, total, items, 'PENDING');

            const response = await fetch('/api/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log('Order placed:');
            currentOrder.forEach((orderEntry) => {
                console.log(`${orderEntry.qty}x${orderEntry.item.name}`);
            });

            setCurrentOrder([]);
        } finally {
            setIsPlacingOrder(false);
        }
    }

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden h-full flex flex-row">
            <div className="w-[500px] border-[1px] border-solid border-text m-12 mr-0 overflow-y-scroll">
                {currentOrder.map(({ item, qty }) => (
                    <CustomerOrderItem
                        key={item.id}
                        item={item}
                        qty={qty}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                ))}
            </div>
            <div className="w-[70%] m-12">
                <div className="h-[75%] overflow-y-scroll">
                    <table className="w-full border-collapse border-b-[1px] border-b-solid border-b-text text-lg">
                        <thead className="h-16 top-0 sticky z-1">
                            <tr>
                                <th className="text-left w-[70%] py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Item
                                </th>
                                <th className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Quantity
                                </th>
                                <th className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.map(({ item, qty }) => (
                                <tr key={item.id}>
                                    <td className="text-left py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        {item.name}
                                    </td>
                                    <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        x{qty}
                                    </td>
                                    <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                        ${(item.price * qty).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-background bottom-0 sticky z-1">
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Subtotal
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${subTotal.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Tax
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${tax.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-3 border-b-[1px] border-b-solid border-b-text"></td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    Total
                                </td>
                                <td className="text-right py-1 px-3 border-b-[1px] border-b-solid border-b-text">
                                    ${total.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <section className="w-full h-fit flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center p-4">
                        <h2 className="text-2xl font-bold w-fit h-fit">
                            Payment
                        </h2>
                        <Link
                            className="bg-secondary duration-200 hover:bg-secondary/70 w-fit p-4 rounded-2xl"
                            href="/user/customer/"
                        >
                            Back to menu
                        </Link>
                    </div>
                    <div className="flex flex-end">
                        <button
                            className="bg-secondary w-full py-8 text-2xl duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:cursor-not-allowed rounded-[1rem] border-background border-r-2"
                            onClick={() => setShowPopup(true)}
                            disabled={
                                isPlacingOrder || currentOrder.length === 0
                            }
                        >
                            Go to Payment
                        </button>
                    </div>
                </section>
            </div>
            <Popup showPopup={showPopup} setShowPopup={setShowPopup}>
                <div className="flex flex-col w-full mx-auto min-h-[600px]">
                    <div className="mb-10">
                        <h2 className="text-center font-bold text-xl uppercase">
                            Secure payment info
                        </h2>
                    </div>
                    <div className="mb-3 flex mx-2">
                        <div className="px-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    onClick={() =>
                                        setPaymentMethod('Credit Card')
                                    }
                                    className="form-radio h-5 w-5 "
                                    name="type"
                                    id="type1"
                                    checked={paymentMethod === 'Credit Card'}
                                />
                                <p className="text-lg px-2">Credit Card</p>
                            </label>
                        </div>
                        <div className="px-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    onClick={() =>
                                        setPaymentMethod('Debit Card')
                                    }
                                    className="form-radio h-5 w-5 "
                                    name="type"
                                    id="type1"
                                    checked={paymentMethod === 'Debit Card'}
                                />
                                <p className="text-lg px-2">Debit Card</p>
                            </label>
                        </div>
                        <div className="px-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    onClick={() =>
                                        setPaymentMethod('Dining Dollars')
                                    }
                                    className="form-radio h-5 w-5 "
                                    name="type"
                                    id="type1"
                                    checked={paymentMethod === 'Dining Dollars'}
                                />
                                <p className="text-lg px-2">Dining Dollars</p>
                            </label>
                        </div>
                        <div className="px-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    onClick={() => setPaymentMethod('Cash')}
                                    className="form-radio h-5 w-5 "
                                    name="type"
                                    id="type1"
                                    checked={paymentMethod === 'Cash'}
                                />
                                <p className="text-lg px-2">Cash</p>
                            </label>
                        </div>
                    </div>
                    {paymentMethod === 'Credit Card' ||
                    paymentMethod === 'Debit Card' ? (
                        <form
                            className="flex flex-col justify-between grow"
                            onSubmit={placeOrder}
                        >
                            <div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Name on card
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            placeholder="John Smith"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Card number
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                                            minLength={19}
                                            maxLength={19}
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 -mx-2 flex items-end">
                                    <div className="px-2 w-1/2">
                                        <label className="font-bold text-sm mb-2 ml-1">
                                            Expiration date
                                        </label>
                                        <div>
                                            <select className="form-select w-full rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors cursor-pointer">
                                                <option value="01">
                                                    01 - January
                                                </option>
                                                <option value="02">
                                                    02 - February
                                                </option>
                                                <option value="03">
                                                    03 - March
                                                </option>
                                                <option value="04">
                                                    04 - April
                                                </option>
                                                <option value="05">
                                                    05 - May
                                                </option>
                                                <option value="06">
                                                    06 - June
                                                </option>
                                                <option value="07">
                                                    07 - July
                                                </option>
                                                <option value="08">
                                                    08 - August
                                                </option>
                                                <option value="09">
                                                    09 - September
                                                </option>
                                                <option value="10">
                                                    10 - October
                                                </option>
                                                <option value="11">
                                                    11 - November
                                                </option>
                                                <option value="12">
                                                    12 - December
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="px-2 w-1/2">
                                        <select className="form-select w-full rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors cursor-pointer">
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                            <option value="2031">2031</option>
                                            <option value="2032">2032</option>
                                            <option value="2033">2033</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Security code
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-32 focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{3}"
                                            minLength={3}
                                            maxLength={3}
                                            placeholder="xxx"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="block w-full max-w-xs mx-auto bg-secondary hover:bg-secondary/50 focus:bg-secondary/50 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-secondary/30 disabled:cursor-not-allowed"
                                    type="submit"
                                >
                                    <i className="mdi mdi-lock-outline mr-1"></i>{' '}
                                    SUBMIT ORDER
                                </button>
                            </div>
                        </form>
                    ) : paymentMethod === 'Dining Dollars' ? (
                        <form
                            className="flex flex-col justify-between grow"
                            onSubmit={placeOrder}
                        >
                            <div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Name
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            placeholder="John Smith"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        UIN
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{9}"
                                            minLength={9}
                                            maxLength={9}
                                            placeholder="000000000"
                                            required
                                        />
                                    </div>
                                </div>
                                <p className="text-lg">
                                    This will use your dining dollars connected
                                    to the account with your name and UIN to pay
                                    for the order.
                                </p>
                            </div>
                            <div>
                                <button
                                    className="block w-full max-w-xs mx-auto bg-secondary hover:bg-secondary/50 focus:bg-secondary/50 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-secondary/30 disabled:cursor-not-allowed"
                                    type="submit"
                                >
                                    <i className="mdi mdi-lock-outline mr-1"></i>{' '}
                                    SUBMIT ORDER
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form
                            className="flex flex-col justify-between grow"
                            onSubmit={placeOrder}
                        >
                            <div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Name
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            placeholder="John Smith"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Email
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            placeholder="name@example.com"
                                            type="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-bold text-sm mb-2 ml-1">
                                        Phone Number
                                    </label>
                                    <div>
                                        <input
                                            className="rounded-2xl p-4 bg-text text-background duration-200 w-full focus:outline-none focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1 transition-colors"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="([0-9]{3}) [0-9]{3}-[0-9]{4}"
                                            minLength={14}
                                            maxLength={14}
                                            placeholder="(xxx) xxx-xxxx"
                                            required
                                        />
                                    </div>
                                </div>
                                <p className="text-lg">
                                    Pay in cash in store. We will send email and
                                    text message once your order is done. We
                                    will ask your name to see if it matches what
                                    you put in the above box to verify
                                    you&apos;re the person for the order.
                                </p>
                            </div>
                            <div>
                                <button
                                    className="block w-full max-w-xs mx-auto bg-secondary hover:bg-secondary/50 focus:bg-secondary/50 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-secondary/30 disabled:cursor-not-allowed"
                                    type="submit"
                                >
                                    <i className="mdi mdi-lock-outline mr-1"></i>{' '}
                                    SUBMIT ORDER
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Popup>
        </main>
    );
}
