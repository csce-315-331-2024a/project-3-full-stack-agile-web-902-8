import React, { useState } from 'react';
import styles from './component.module.css';
import { InventoryItem } from '@/lib/models';

type InventoryAdjusterProp = {
    item: InventoryItem;
};

function InventoryAdjuster({ item }: InventoryAdjusterProp) {
    /*const isClient = typeof window !== 'undefined';

    if (!isClient) {
        return null;
    }*/

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

    return (
        <form onSubmit={handleSubmit}>
            <h2>{item.name}</h2>
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
                    name="avgPrice"
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
    );
}

export default InventoryAdjuster;
