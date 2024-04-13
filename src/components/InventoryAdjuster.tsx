import React, { useEffect, useState } from 'react';
import styles from './component.module.css';
import { InventoryItem } from '@/lib/models';
import { addOrUpdateInventoryItem } from '@/lib/inventory';
import { POST } from '@/app/api/addOrUpdateInventoryItem/route';

/*type adjusterProps = {
    item: InventoryItem;
};*/

function InventoryAdjuster(/*{ item }: adjusterProps*/) {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    //const [adjustedItem, setAdjustedItem] = useState<InventoryItem | null>(null);
    const [form, setForm] = useState({
        name: '',
        quantity: 0,
        minQuanity: 0,
        maxQuantity: 0,
        averageCost: 0,
    });
    /*const [adjustedName, setAdjustedName] = useState<string>('');
    const [adjustedQuantity, setAdjustedQuantity] = useState<number>(0);
    const [adjustedMinQuantity, setAdjustedMinQuantity] = useState<number>(0);
    const [adjustedMaxQuantity, setAdjustedMaxQuantity] = useState<number>(0);
    const [adjustedCost, setAdjustedCost] = useState<number>(0);*/
    const [adjustedRequest, setAdjustedRequest] = useState<number>(0);
    const [exists, setExists] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    async function fetchInventoryItems() {
        const response = await fetch('/api/getAllInventoryItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const inventoryItemNames = await response.json();
        setItemNames(inventoryItemNames);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((form) => ({
            ...form,
            [name]: value,
        }));

        async function existsInInventory() {
            const response = await fetch('/api/existInInventory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form.name),
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
        const item = new InventoryItem(
            0,
            form.name,
            form.averageCost,
            form.quantity,
            form.minQuanity,
            form.maxQuantity
        );
        console.log(item);
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
        updateInventoryItem();
        fetchInventoryItems();
        console.log(itemNames);
    };

    useEffect(() => {
        fetchInventoryItems();
        console.log(itemNames);
    }, [itemNames]);

    const handleSelect = (itemName: string) => {
        setSelected(itemName);
        async function getInventoryItem() {
            const response = await fetch('/api/getInventoryItemByName', {
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
            //setForm(inventoryItem);
            setForm((form) => ({
                ...form,
                [form.name]: inventoryItem.name,
            }));
            setForm((form) => ({
                ...form,
                [form.quantity]: inventoryItem.quantity,
            }));
            setForm((form) => ({
                ...form,
                [form.averageCost]: inventoryItem.averageCost,
            }));
            setForm((form) => ({
                ...form,
                [form.minQuanity]: inventoryItem.minQuantity,
            }));
            setForm((form) => ({
                ...form,
                [form.maxQuantity]: inventoryItem.maxQuantity,
            }));
        }
        getInventoryItem();
        setVisible(true);
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

            {visible && (
                <form onSubmit={handleSubmit}>
                    <h2>{selected || ''}</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </label>
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
                            value={form.minQuanity}
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
                    <label>
                        Quantity to Request:
                        <input
                            type="number"
                            name="reqQuantity"
                            value={adjustedRequest}
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
            )}
        </div>
    );
}

export default InventoryAdjuster;
