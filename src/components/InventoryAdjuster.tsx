import React, { useEffect, useState } from 'react';
import styles from './component.module.css';
import { InventoryItem } from '@/lib/models';
import { addOrUpdateInventoryItem } from '@/lib/inventory';
import { POST } from '@/app/api/addOrUpdateInventoryItem/route';

type adjusterProps = {
    item: InventoryItem;
};

function InventoryAdjuster({ item }: adjusterProps) {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [adjustedItem, setAdjustedItem] = useState(item);
    const [exists, setExists] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdjustedItem((adjustedItem) => ({
            ...adjustedItem,
            [name]: value,
        }));

        async function existsInInventory() {
            const response = await fetch('/api/addOrUpdateInventoryItem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const existing = await response.json();
            setExists(existing);
        }
        existsInInventory();
        console.log(selected);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(adjustedItem);
        async function updateInventoryItem() {
            const response = await fetch('/api/addOrUpdateInventoryItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adjustedItem),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const inventoryItemNames = await response.json();
            setItemNames(inventoryItemNames);
        }
        updateInventoryItem();
        console.log(itemNames);
    };

    useEffect(() => {
        async function fetchInventoryItems() {
            const response = await fetch('/api/getAllInventoryItemNames');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const inventoryItemNames = await response.json();
            setItemNames(inventoryItemNames);
        }
        fetchInventoryItems();
        console.log(itemNames);
    }, [itemNames]);

    const handleSelect = (itemName: string) => {
        setSelected(itemName);
        async function getInventoryItem() {
            const response = await fetch('/api/addOrUpdateInventoryItem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selected),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const inventoryItem = await response.json();
            setAdjustedItem(inventoryItem);
        }
        getInventoryItem();
    };

    return (
        <div>
            <div className="dropdown">
                <button className="dropdown-toggle">
                    {selected || 'Select an option'}
                </button>
                <ul className="dropdown-menu">
                    {itemNames.map((itemName, index) => (
                        <li key={index} onClick={() => handleSelect(itemName)}>
                            {itemName}
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>{adjustedItem?.name || ''}</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={adjustedItem?.name || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Current Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={adjustedItem?.quantity || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Average Price Per Pound:
                    <input
                        type="number"
                        name="averageCost"
                        value={adjustedItem?.averageCost || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Minimum Quantity:
                    <input
                        type="number"
                        name="minQuantity"
                        value={adjustedItem?.minQuantity || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Maximum Quantity:
                    <input
                        type="number"
                        name="maxQuantity"
                        value={adjustedItem?.maxQuantity || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Quantity to Request:
                    <input
                        type="number"
                        name="reqQuantity"
                        value={0}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    <button>Add Item</button>
                    <button type="submit">
                        {exists ? 'Save Changes' : 'Add Item'}
                    </button>
                    <button>Delete Item</button>
                    <button>Request Item</button>
                </div>
            </form>
        </div>
    );
}

export default InventoryAdjuster;
