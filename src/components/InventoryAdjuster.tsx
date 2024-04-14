import React, { useEffect, useState } from 'react';
import styles from './component.module.css';
import { InventoryItem } from '@/lib/models';
import { addOrUpdateInventoryItem } from '@/lib/inventory';
import { POST } from '@/app/api/addOrUpdateInventoryItem/route';
import { urlToHttpOptions } from 'url';
import { warnOptionHasBeenDeprecated } from 'next/dist/server/config';

function InventoryAdjuster() {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [requesting, setRequesting] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: '',
        quantity: 0,
        minQuantity: 0,
        maxQuantity: 0,
        averageCost: 0,
    });
    const [adjustedRequest, setAdjustedRequest] = useState<number>(0);
    const [exists, setExists] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    async function fetchInventoryItems() {
        const response = await fetch('/api/getAllInventoryItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const inventoryItemNames = await response.json();
        const sortedNames = inventoryItemNames.sort((a: string, b: string) =>
            a.localeCompare(b)
        );
        setItemNames(sortedNames);
    }

    /*async function existsInInventory() {
        console.log(form.name);
        const response = await fetch('/api/existsInInventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.name),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const existing = await response.json();
        console.log(existing);
        setExists(existing);
    }*/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((form) => ({
            ...form,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const item = new InventoryItem(
            0,
            form.name,
            Number(form.averageCost),
            Number(form.quantity),
            Number(form.minQuantity),
            Number(form.maxQuantity)
        );
        async function updateInventoryItem() {
            const response = await fetch('/api/addOrUpdateInventoryItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }

        if (
            form.averageCost < 0 ||
            form.maxQuantity < 0 ||
            form.minQuantity < 0 ||
            form.quantity < 0
        ) {
            alert('Cannot have negative values');
        } else if (
            form.minQuantity > form.maxQuantity ||
            form.quantity > form.maxQuantity
        ) {
            alert('Exceeds max or min bounds for quantity');
        } else {
            if (selected == 'new') {
                const confirm = window.confirm(
                    'Are you sure you want to add this item?'
                );
                if (confirm) {
                    console.log('Creating new');
                    console.log(item);
                    updateInventoryItem();
                    setForm({
                        name: '',
                        quantity: 0,
                        minQuantity: 0,
                        maxQuantity: 0,
                        averageCost: 0,
                    });
                }
            } else {
                console.log(item);
                updateInventoryItem();
            }
            fetchInventoryItems();
        }
    };

    useEffect(() => {
        fetchInventoryItems();
    }, [itemNames]);

    useEffect(() => {
        async function getInventoryItem() {
            const response = await fetch('/api/getInventoryItemByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const inventoryItem = await response.json();
            const parseItem = JSON.parse(inventoryItem);
            console.log(inventoryItem);
            console.log(parseItem);
            //setForm(inventoryItem);
            setForm((form) => ({
                ...form,
                name: parseItem.name,
            }));
            setForm((form) => ({
                ...form,
                quantity: parseItem.quantity,
            }));
            setForm((form) => ({
                ...form,
                averageCost: parseItem.averageCost,
            }));
            setForm((form) => ({
                ...form,
                minQuantity: parseItem.minQuantity,
            }));
            setForm((form) => ({
                ...form,
                maxQuantity: parseItem.maxQuantity,
            }));
        }

        if (selected == 'new') {
            setExists(false);
            setForm({
                name: '',
                quantity: 0,
                minQuantity: 0,
                maxQuantity: 0,
                averageCost: 0,
            });
        } else if (selected != '') {
            getInventoryItem();
            setExists(true);
        }
    }, [selected, exists]);

    /*useEffect(() => {
        existsInInventory();
    }, [form.name]);*/

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        setSelected(itemName);
        setVisible(true);
    };

    const handleReqClick = () => {
        setRequesting(true);
    };

    const handleCloseRequest = () => {
        setRequesting(false);
    };

    const handleReqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRequest = parseInt(e.target.value);
        setAdjustedRequest(newRequest);
    };

    const handleRequest = () => {
        async function doRequest() {
            const response = await fetch('/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: selected,
                    amount: adjustedRequest,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }
        if (adjustedRequest < 0) {
            alert('Cannot request a negative amount');
        } else if (form.quantity + adjustedRequest > form.maxQuantity) {
            alert('Exceeds maximum quantity');
        } else {
            doRequest();
            setForm((form) => ({
                ...form,
                quantity: form.quantity + adjustedRequest,
            }));
            setRequesting(false);
        }
    };

    const handleRemove = () => {
        async function removeInventoryItem() {
            const response = await fetch('/api/removeInventoryItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }
        removeInventoryItem();
        setSelected('');
        setVisible(false);
        setItemNames([]);
    };

    return (
        <div>
            <select id="dropdown" value={selected} onChange={handleSelect}>
                <option value="" disabled>
                    Select an option
                </option>
                {itemNames.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                <option value="new">Add an Inventory Item</option>
            </select>

            {visible && (
                <form onSubmit={handleSubmit}>
                    <h2>{selected || ''}</h2>
                    {!exists && (
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <label>
                        Current Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Average Price Per Pound:
                        <input
                            type="number"
                            name="averageCost"
                            value={form.averageCost}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Minimum Quantity:
                        <input
                            type="number"
                            name="minQuantity"
                            value={form.minQuantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Maximum Quantity:
                        <input
                            type="number"
                            name="maxQuantity"
                            value={form.maxQuantity}
                            onChange={handleChange}
                        />
                    </label>
                    <div>
                        <button type="submit">
                            {exists ? 'Save Changes' : 'Add Item'}
                        </button>
                        {exists && (
                            <button onClick={handleRemove}>Delete Item</button>
                        )}
                        {exists && (
                            <button onClick={handleReqClick}>
                                Request Item
                            </button>
                        )}
                    </div>
                </form>
            )}

            {requesting && (
                <div>
                    <label>
                        Quantity to Request:
                        <input
                            type="number"
                            name="reqQuantity"
                            value={adjustedRequest}
                            onChange={handleReqChange}
                        />
                    </label>
                    <button onClick={handleRequest}>Submit Request</button>
                    <button onClick={handleCloseRequest}>Nevermind</button>
                </div>
            )}
        </div>
    );
}

export default InventoryAdjuster;
