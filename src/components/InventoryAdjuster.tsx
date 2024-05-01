import React, { useEffect, useState } from 'react';
import { InventoryItem } from '@/lib/models';

interface InventoryAdjusterProps {
    className?: string;
}

/**
 * Creates the component for adjusting the inventory
 * @returns the component for adjusting the inventory
 */
function InventoryAdjuster({ className }: InventoryAdjusterProps) {
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
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);
    const [inFlux, setInFlux] = useState<boolean>(false);

    /**
     * Fetches the list of inventory items from the api route
     */
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

    /**
     * Handles change in any of the form input elements
     * @param e the input element changed
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((form) => ({
            ...form,
            [name]: value,
        }));
        setInFlux(true);
    };

    /**
     * handles submitting the form and changed the database accordingly
     * @param e the form that was submitted
     */
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

        /**
         * Updates the inventory item in the database with the form values
         */
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
            Number(form.averageCost) < 0 ||
            Number(form.maxQuantity) < 0 ||
            Number(form.minQuantity) < 0 ||
            Number(form.quantity) < 0
        ) {
            alert('Cannot have negative values');
        } else if (
            Number(form.minQuantity) > Number(form.maxQuantity) ||
            Number(form.quantity) > Number(form.maxQuantity)
        ) {
            alert('Exceeds max or min bounds for quantity');
        } else {
            if (selected === 'new') {
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
                    setSelected('');
                    setVisible(false);
                    fetchInventoryItems();
                }
            } else {
                console.log(item);
                updateInventoryItem();
            }
            setInFlux(false);
        }
        fetchInventoryItems();
    };

    useEffect(() => {
        fetchInventoryItems();
    }, [selected, exists]);

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
        if (needsRefresh) {
            setNeedsRefresh(false);
        }
    }, [selected, exists, needsRefresh]);

    /*useEffect(() => {
        existsInInventory();
    }, [form.name]);*/

    /**
     * Sets the selected inventory item
     * @param e the select element
     */
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        setSelected(itemName);
        setVisible(true);
    };

    /**
     * Reveals the popup for requests when making requests
     */
    const handleReqClick = () => {
        setRequesting(true);
    };

    /**
     * Hides the popup for requests when no longer making requests
     */
    const handleCloseRequest = () => {
        setRequesting(false);
    };

    /**
     * Handles changes in the request field
     * @param e the request input field
     */
    const handleReqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRequest = parseInt(e.target.value);
        setAdjustedRequest(newRequest);
    };

    /**
     * Handles processing a request for the current inventory item
     */
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
        if (Number(adjustedRequest) < 0) {
            alert('Cannot request a negative amount');
        } else if (
            Number(form.quantity) + Number(adjustedRequest) >
            Number(form.maxQuantity)
        ) {
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

    /**
     * Handles removing the current inventory item
     */
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
        fetchInventoryItems();
    };

    const handleRefresh = () => {
        setNeedsRefresh(true);
    };

    return (
        <div
            className={
                'flex flex-col items-center justify-start gap-4 ' + className
            }
        >
            <div className="flex flex-row-reverse items-center justify-center gap-4">
                <button
                    className="bg-secondary duration-200 p-4 rounded-2xl hover:bg-secondary/50"
                    type="button"
                    onClick={handleRefresh}
                >
                    Reset Changes
                </button>

                {/*TODO: figure out select hover effect.*/}
                <select
                    className="bg-secondary duration-200 hover:cursor-pointer rounded-2xl flex justify-center items-center w-fit h-fit p-4"
                    id="dropdown"
                    value={selected}
                    onChange={handleSelect}
                >
                    <option
                        className="bg-secondary text-text font-sans"
                        value=""
                        disabled
                    >
                        Select an option
                    </option>
                    {itemNames.map((option, index) => (
                        <option
                            className="bg-secondary text-text font-sans"
                            key={index}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                    <option
                        className="bg-secondary text-text font-sans"
                        value="new"
                    >
                        Add an Inventory Item
                    </option>
                </select>
            </div>

            {visible && (
                <form
                    className="flex flex-col items-left justify-start gap-4 rounded-2xl border-l-[0.5rem] border-l-accent p-4 bg-secondary/20"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-[2rem] font-bold">
                        {selected === 'new' ? 'New Item' : selected}
                    </h2>
                    {!exists && (
                        <label className="flex flex-row items-center justify-between gap-4">
                            Name:
                            <input
                                className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <label className="flex flex-row items-center justify-between gap-4">
                        Current Quantity:
                        <input
                            className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Average Price Per Pound:
                        <input
                            className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="averageCost"
                            value={form.averageCost}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Minimum Quantity:
                        <input
                            className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="minQuantity"
                            value={form.minQuantity}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Maximum Quantity:
                        <input
                            className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="maxQuantity"
                            value={form.maxQuantity}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="flex flex-row items-center justify-center gap-4">
                        {inFlux && (
                            <button
                                className="text-background bg-primary rounded-2xl p-4 duration-200 hover:text-text hover:bg-primary/70"
                                type="submit"
                            >
                                {exists ? 'Save Changes' : 'Add Item'}
                            </button>
                        )}
                        {exists && (
                            <button
                                className="text-background bg-primary rounded-2xl p-4 duration-200 hover:text-text hover:bg-primary/70"
                                onClick={handleRemove}
                            >
                                Delete Item
                            </button>
                        )}
                        {exists && !inFlux && (
                            <button
                                className="text-background bg-primary rounded-2xl p-4 duration-200 hover:text-text hover:bg-primary/70"
                                onClick={handleReqClick}
                            >
                                Request Item
                            </button>
                        )}
                    </div>
                </form>
            )}

            {requesting && !inFlux && (
                <div className="flex flex-col items-left justify-start gap-4 rounded-2xl border-l-[0.5rem] border-l-accent p-4 bg-secondary/20">
                    <label className="flex flex-row items-center justify-between gap-4">
                        Quantity to Request:
                        <input
                            className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="reqQuantity"
                            value={adjustedRequest}
                            onChange={handleReqChange}
                        />
                    </label>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <button
                            className="text-background bg-primary rounded-2xl p-4 duration-200 hover:text-text hover:bg-primary/70"
                            onClick={handleRequest}
                        >
                            Submit Request
                        </button>
                        <button
                            className="text-text bg-secondary rounded-2xl p-4 duration-200 hover:text-text hover:bg-secondary/30"
                            onClick={handleCloseRequest}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InventoryAdjuster;
