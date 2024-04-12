import React, { useEffect, useState } from 'react';
import styles from './component.module.css';


function InventoryDropDown() {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string|null>(null);

    useEffect(() => {
        async function fetchInventoryItems() {
            const response = await fetch('/api/getAllInventoryItemNames', {
                method: 'GET'
            });
            const inventoryItemNames = await response.json();
            setItemNames(inventoryItemNames);
        }
        fetchInventoryItems();
        console.log(itemNames)
    }, [])

    return (
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
    );
}

export default InventoryDropDown;