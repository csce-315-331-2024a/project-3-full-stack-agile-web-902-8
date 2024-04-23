import React, { useEffect, useState } from 'react';
import { format, startOfToday } from 'date-fns';
import styles from './component.module.css';
import { Ingredient, InventoryItem, MenuItem, Seasonal } from '@/lib/models';

function MenuEditer() {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [inventoryNames, setInventoryNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [selectedIng, setSelectedIng] = useState<string>('');
    const [exists, setExists] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: '',
        type: '',
        price: 0,
        netPrice: 0,
        popularity: 0,
        seasonal: false,
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<string | undefined>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [endDate, setEndDate] = useState<string | undefined>(
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    const [recurring, setRecurring] = useState<boolean>(false);
    const [addingIngredient, setAddingIngredient] = useState<boolean>(false);
    const [newQuantity, setNewQuantity] = useState<number>(0);
    /*const [seasonalData, setSeasonalData] = useState({
        startDate: '',
        endDate: '',
        recurring: false,
    });*/

    async function fetchMenuItems() {
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

    async function fetchInventoryItems() {
        const response = await fetch('/api/getAllInventoryItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const inventoryItemNames = await response.json();
        const sortedNames = inventoryItemNames.sort((a: string, b: string) =>
            a.localeCompare(b)
        );
        //console.log(sortedNames);
        setInventoryNames(sortedNames);
        const existingNames: string[] = [];
        ingredients.forEach((element) => {
            existingNames.push(element.inventoryItem.name);
        });
        //console.log(existingNames);
        const filtered = sortedNames.filter(
            (name: string) => !existingNames.includes(name)
        );
        //console.log(filtered);
        setInventoryNames(filtered);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((form) => ({
            ...form,
            [name]: value,
        }));
    };

    const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    /*const handleBeginTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSeasonalData((seasonalData) => ({
            ...seasonalData,
            [seasonalData.startDate]: e.target.value,
        }));
    };*/

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((form) => ({
            ...form,
            seasonal: e.target.checked,
        }));
    };

    const handleCheckRecurring = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecurring(e.target.checked);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const seasonal = new Seasonal(
            Number(startDate),
            Number(endDate),
            recurring
        );
        console.log(ingredients);
        const menuItem = new MenuItem(
            0,
            form.name,
            form.type,
            Number(form.price),
            Number(form.netPrice),
            Number(form.popularity),
            ingredients,
            seasonal
        );

        async function updateMenuItem() {
            const response = await fetch('/api/addOrUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }

        if (
            Number(form.price) < 0 ||
            Number(form.netPrice) < 0 ||
            Number(form.popularity) < 0
        ) {
            alert('Cannot have negative values');
        } else {
            if (selected == 'new') {
                const confirm = window.confirm(
                    'Are you sure you want to add this item?'
                );
                if (confirm) {
                    //console.log('Creating new');
                    //console.log(menuItem);
                    updateMenuItem();
                    setForm({
                        name: '',
                        type: '',
                        price: 0,
                        netPrice: 0,
                        popularity: 0,
                        seasonal: false,
                    });
                }
            } else {
                console.log(menuItem);
                updateMenuItem();
            }
            fetchMenuItems();
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, [selected, exists]);

    useEffect(() => {
        fetchInventoryItems();
    }, [addingIngredient]);

    useEffect(() => {
        if (!form.seasonal) {
            setStartDate(undefined);
            setEndDate(undefined);
            setRecurring(false);
        }
    }, [form.seasonal]);

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
            setForm((form) => ({
                ...form,
                name: parseItem.name,
            }));
            setForm((form) => ({
                ...form,
                type: parseItem.type,
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
            const myIngredients: Ingredient[] = [];
            parseItem.ingredients.forEach(
                (element: { inventoryItem: InventoryItem; amount: number }) => {
                    myIngredients.push(
                        new Ingredient(element.inventoryItem, element.amount)
                    );
                }
            );
            setIngredients(myIngredients);
            if (parseItem.seasonal.startDate != undefined) {
                setForm((form) => ({
                    ...form,
                    seasonal: true,
                }));
                setStartDate(
                    format(
                        new Date(parseItem.seasonal.startDate),
                        "yyyy-MM-dd'T'HH:mm"
                    )
                );
                setEndDate(
                    format(
                        new Date(parseItem.seasonal.endDate),
                        "yyyy-MM-dd'T'HH:mm"
                    )
                );
                setRecurring(parseItem.seasonal.recurring);
            } else {
                setForm((form) => ({
                    ...form,
                    seasonal: false,
                }));
                setStartDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
                setEndDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
                setRecurring(false);
            }
        }

        if (selected == 'new') {
            setExists(false);
            setForm({
                name: '',
                type: '',
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
        setAddingIngredient(false);
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

    const handleRemoveIngredient = (i: number) => {
        const removed = [...ingredients];
        removed.splice(i, 1);
        setIngredients(removed);
    };

    const handleChangeAmount = (i: number, quantity: number) => {
        const changed = [...ingredients];
        if (quantity >= 1) {
            changed[i].amount = quantity;
            setIngredients(changed);
        }
    };

    const handleAddIngredient = () => {
        setAddingIngredient(true);
    };

    const handleSelectIng = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        setSelectedIng(itemName);
    };

    const handleChangeNewQuantity = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const quantity = e.target.value;
        if (parseInt(quantity) >= 1) {
            setNewQuantity(parseInt(quantity));
        }
    };

    const handleConfirmIngredient = () => {
        async function getInventoryItem() {
            const response = await fetch('/api/getInventoryItemByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedIng),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const inventoryItem = await response.json();
            const parseItem = JSON.parse(inventoryItem);
            const newIngredient = new Ingredient(parseItem, newQuantity);
            setIngredients([...ingredients, newIngredient]);
            console.log(ingredients);
        }
        if (Number(newQuantity) < 1) {
            alert('Invalid quantity');
        } else if (selectedIng == '') {
            alert('Please select an item');
        } else {
            getInventoryItem();
            setAddingIngredient(false);
            setNewQuantity(0);
            setSelectedIng('');
        }
    };

    const handleCancelIngredient = () => {
        setAddingIngredient(false);
        setNewQuantity(0);
        setSelectedIng('');
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
                <option value="new">Add a Menu Item</option>
            </select>

            {visible && (
                <form onSubmit={handleSubmit}>
                    <h2>{selected || ''}</h2>

                    <label>Ingredients</label>
                    <table>
                        <thead>
                            <tr>
                                <th>Remove</th>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((entry, index) => (
                                <tr key={index}>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleRemoveIngredient(index)
                                            }
                                            type="button"
                                        >
                                            X
                                        </button>
                                    </td>
                                    <td>{entry.inventoryItem.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={entry.amount}
                                            onChange={(e) =>
                                                handleChangeAmount(
                                                    index,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={handleAddIngredient}>
                        Add an ingredient
                    </button>

                    {addingIngredient && (
                        <div>
                            <select
                                id="dropdown"
                                value={selectedIng}
                                onChange={handleSelectIng}
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                {inventoryNames.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <label>
                                New Ingredient Quantity:
                                <input
                                    type="number"
                                    name="newQuantity"
                                    value={newQuantity}
                                    onChange={handleChangeNewQuantity}
                                />
                            </label>

                            <button
                                type="button"
                                onClick={handleConfirmIngredient}
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelIngredient}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

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
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Net Price:
                        <input
                            type="number"
                            name="netPrice"
                            value={form.netPrice || 0}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Popularity:
                        <input
                            type="number"
                            name="popularity"
                            value={form.popularity}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Seasonal:
                        <input
                            type="checkbox"
                            id="seasonal"
                            checked={form.seasonal}
                            onChange={handleCheck}
                        />
                    </label>

                    {form.seasonal && (
                        <div>
                            <label htmlFor="startDate">
                                Select a starting date:{' '}
                            </label>
                            <input
                                type="datetime-local"
                                id="startDate"
                                value={startDate}
                                onChange={handleChangeStart}
                            />

                            <label htmlFor="endDate">
                                Select a starting date:{' '}
                            </label>
                            <input
                                type="datetime-local"
                                id="endDate"
                                value={endDate}
                                onChange={handleChangeEnd}
                            />

                            <label>
                                Recurring:
                                <input
                                    type="checkbox"
                                    id="recurring"
                                    checked={recurring}
                                    onChange={handleCheckRecurring}
                                />
                            </label>
                        </div>
                    )}

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
