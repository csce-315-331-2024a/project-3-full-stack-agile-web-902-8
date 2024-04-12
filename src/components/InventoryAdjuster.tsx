import React, { useEffect, useState } from 'react';
import styles from './component.module.css';
import { InventoryItem } from '@/lib/models';
import { addOrUpdateInventoryItem } from '@/lib/inventory';

type InventoryAdjusterProp = {
    item: InventoryItem;
};

function InventoryAdjuster({ item }: InventoryAdjusterProp) {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string|null>(null);
    const [adjustedItem, setAdjustedItem] = useState(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdjustedItem((adjustedItem) => ({
            ...adjustedItem,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(adjustedItem);
    };

    useEffect(() => {
        async function fetchInventoryItems() {
            const response = await fetch('/api/getAllInventoryItemNames');
            const inventoryItemNames = await response.json();
            setItemNames(inventoryItemNames);
        }
        fetchInventoryItems();
        console.log(itemNames)
    }, [])

    /*const handleDrop = () => {

    };*/

    return (
        <div>

            <div className = "dropdown">
                <button className = "dropdown-toggle">
                    {selected || 'Select an option'}
                </button>
                <ul className = "dropdown-menu">
                    {itemNames.map((itemName, index) => (
                        <li key = {index}>
                            {itemName}
                        </li>
                    ))}
                </ul>
            </div>


            <form onSubmit={handleSubmit}>
                <h2>{adjustedItem.name}</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={adjustedItem.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Current Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={adjustedItem.quantity}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Average Price Per Pound:
                    <input
                        type="number"
                        name="averageCost"
                        value={adjustedItem.averageCost}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Minimum Quantity:
                    <input
                        type="number"
                        name="minQuantity"
                        value={adjustedItem.minQuantity}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Maximum Quantity:
                    <input
                        type="number"
                        name="maxQuantity"
                        value={adjustedItem.maxQuantity}
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
                    <button type="submit">Save Changes</button>
                    <button>Delete Item</button>
                    <button>Request Item</button>
                </div>
            </form>
        </div>
    );
}

export default InventoryAdjuster;