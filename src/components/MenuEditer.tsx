import React, { useEffect, useState } from 'react';
import styles from './component.module.css';
import { MIDDLEWARE_BUILD_MANIFEST } from 'next/dist/shared/lib/constants';
import { MenuItem } from '@/lib/models';

function MenuEditer() {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [exists, setExists] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: '',
        price: 0,
        netPrice: 0,
        popularity: 0,
        seasonal: false,
    });

    const [visible, setVisible] = useState<boolean>(false);

    async function fetchInventoryItems() {
        const response = await fetch('/api/getAllMenuItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const menuItemNames = await response.json();
        console.log(menuItemNames);
        const sortedNames = menuItemNames.sort((a: string, b: string) =>
            a.localeCompare(b)
        );
        setItemNames(sortedNames);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((form) => ({
            ...form,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        /*e.preventDefault();
        const item = new MenuItem(
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
        }*/
    };

    useEffect(() => {
        fetchInventoryItems();
    }, [selected, exists]);

    useEffect(() => {
        console.log(selected);
        async function getMenuItem() {
            const response = await fetch('/api/getMenuItemByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const menuItem = await response.json();
            const parseItem = JSON.parse(menuItem);
            console.log(menuItem);
            console.log(parseItem);
            //setForm(inventoryItem);
            setForm((form) => ({
                ...form,
                name: parseItem.name,
            }));
            setForm((form) => ({
                ...form,
                price: parseItem.price,
            }));
            setForm((form) => ({
                ...form,
                netPrice: parseItem.netPrice,
            }));
            setForm((form) => ({
                ...form,
                popularity: parseItem.popularity,
            }));
            console.log(parseItem.seasonal.startDate);
            console.log(parseItem.seasonal.startDate == undefined);
            if(parseItem.seasonal.startDate != undefined)
            {
                setForm((form) => ({
                    ...form,
                    seasonal: true,
                }));
            }
            else
            {
                setForm((form) => ({
                    ...form,
                    seasonal: false,
                }));
            }
        }

        if (selected == 'new') {
            setExists(false);
            setForm({
                name: '',
                price: 0,
                netPrice: 0,
                popularity: 0,
                seasonal: false,
            });
        } else if (selected != '') {
            getMenuItem();
            setExists(true);
        }
    }, [selected, exists]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        setSelected(itemName);
        setVisible(true);
    };

    const handleRemove = () => {
        async function removeMenuItem() {
            const response = await fetch('/api/remove', {
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
        removeMenuItem();
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
                        Price:
                        <input
                            type="number"
                            name="quantity"
                            value={form.price}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Net Price:
                        <input
                            type="number"
                            name="averageCost"
                            value={form.netPrice}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Popularity:
                        <input
                            type="number"
                            name="minQuantity"
                            value={form.popularity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Seasonal:
                        <input
                            type="checkbox"
                            checked={form.seasonal}
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
                    </div>
                </form>
            )}
        </div>
    );
}

export default MenuEditer;
