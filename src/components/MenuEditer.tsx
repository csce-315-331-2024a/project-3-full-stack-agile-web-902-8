import React, { useCallback, useEffect, useState } from 'react';
import { format, startOfToday } from 'date-fns';
import styles from './component.module.css';
import { Ingredient, InventoryItem, MenuItem, Seasonal } from '@/lib/models';
import { updateSeasonalItem } from '@/lib/menu';
import { start } from 'repl';

/**
 * Creates the component for editing menu items
 * @return the comopnent for editing menu items
 */
function MenuEditer() {
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [inventoryNames, setInventoryNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>('');
    const [selectedIng, setSelectedIng] = useState<string>('');
    const [exists, setExists] = useState<boolean>(false);
    const [form, setForm] = useState({
        id: 0,
        name: '',
        type: '',
        description: '',
        price: 0,
        netPrice: 0,
        popularity: 0,
        seasonal: false,
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [recurring, setRecurring] = useState<boolean>(false);
    const [addingIngredient, setAddingIngredient] = useState<boolean>(false);
    const [newQuantity, setNewQuantity] = useState<number>(0);
    const [inFlux, setInFlux] = useState<boolean>(false);

    /**
     * Fetched the menu item names
     */
    async function fetchMenuItems() {
        const response = await fetch('/api/getAllMenuItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const menuItemNames = await response.json();
        //console.log(menuItemNames);
        const sortedNames = menuItemNames.sort((a: string, b: string) =>
            a.localeCompare(b)
        );
        setItemNames(sortedNames);
    }

    /**
     * Fetches the names of the inventory items
     */
    const fetchInventoryItems = useCallback(async () => {
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
    }, [ingredients]);
    /*async function fetchInventoryItems() {
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
    }*/

    /**
     * Handles any change in the form inputs
     * @param e the input that changed
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInFlux(true);
        const { name, value } = e.target;

        setForm((form) => ({
            ...form,
            [name]: value,
        }));
    };

    /**
     * Handles any change in the startdate input
     * @param e the input that changed
     */
    const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInFlux(true);
        setStartDate(e.target.value);
    };

    /**
     * Handles any change in the enddate input
     * @param e the input that changed
     */
    const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInFlux(true);
        setEndDate(e.target.value);
    };

    /**
     * Handles any change in the checkbox input for seasonal
     * @param e the input that changed
     */
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInFlux(true);
        setForm((form) => ({
            ...form,
            seasonal: e.target.checked,
        }));
    };

    /**
     * Handles any change in the checkbox input for recurring
     * @param e the input that changed
     */
    const handleCheckRecurring = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecurring(e.target.checked);
        setInFlux(true);
    };

    /**
     * Handles submitting the form
     * @param e The form to be used for submission
     */
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(ingredients);
        console.log(startDate);
        console.log(endDate);

        const startObject = new Date(startDate);
        const endObject = new Date(endDate);
        startObject.setHours(startObject.getHours() - 5);
        endObject.setHours(endObject.getHours() - 5);
        console.log(startObject);
        console.log(endObject);
        const startTimestamp = Math.floor(startObject.getTime());
        const endTimeStamp = Math.floor(endObject.getTime());

        console.log(ingredients);

        const menuItem = new MenuItem(
            0,
            form.name,
            form.type,
            form.description,
            Number(form.price),
            Number(form.netPrice),
            Number(form.popularity),
            ingredients,
            null
        );

        const menuItemAlt = new MenuItem(
            0,
            form.name,
            form.type,
            form.description,
            Number(form.price),
            Number(form.netPrice),
            Number(form.popularity),
            ingredients,
            new Seasonal(startTimestamp, endTimeStamp, recurring)
        );

        /**
         * Adds a menu item using the api path
         */
        async function addMenuItem() {
            if (!form.seasonal) {
                const response = await fetch('/api/addMenuItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuItem),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } else {
                const response = await fetch('/api/addMenuItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuItemAlt),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }
        }

        /**
         * Updates a menu item using the api path
         */
        async function updateMenuItem() {
            if (!form.seasonal) {
                const response = await fetch('/api/updateMenuItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuItem),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } else {
                const response = await fetch('/api/updateMenuItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuItemAlt),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
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
                    console.log(menuItem);
                    //updateMenuItem();
                    addMenuItem();
                    setForm({
                        id: 0,
                        name: '',
                        type: '',
                        description: '',
                        price: 0,
                        netPrice: 0,
                        popularity: 0,
                        seasonal: false,
                    });
                    setStartDate('');
                    setEndDate('');
                    setSelected('');
                    setIngredients([]);
                    setVisible(false);
                    fetchMenuItems();
                    fetchMenuItems();
                    setInFlux(false);
                }
            } else {
                console.log(menuItem);
                updateMenuItem();
                setInFlux(false);
            }
            fetchMenuItems();
            fetchMenuItems();
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, [selected, selectedIng, exists]);

    useEffect(() => {
        fetchInventoryItems();
    }, [addingIngredient, fetchInventoryItems]);

    useEffect(() => {
        if (form.seasonal && startDate == '' && endDate == '') {
            setStartDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
            setEndDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
            setRecurring(false);
        }
    }, [form.seasonal, startDate, endDate]);

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
            setForm((form) => ({
                ...form,
                id: parseItem.id,
            }));
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
                description: parseItem.description,
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
                id: 0,
                name: '',
                type: '',
                description: '',
                price: 0,
                netPrice: 0,
                popularity: 0,
                seasonal: false,
            });
            setIngredients([]);
        } else if (selected != '') {
            getMenuItem();
            setExists(true);
        }
    }, [selected, exists]);

    /**
     * Handles a change in selection from teh dropdown
     * @param e The select element that changed
     */
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInFlux(false);
        const itemName = e.target.value;
        setSelected(itemName);
        setVisible(true);
        setAddingIngredient(false);
    };

    /**
     * Handles removing a menu item
     */
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
        fetchMenuItems();
        fetchMenuItems();
    };

    /**
     * Handles removing an ingredient
     * @param i the index of the ingredient to remove
     */
    const handleRemoveIngredient = (i: number) => {
        setInFlux(true);
        const removed = [...ingredients];
        removed.splice(i, 1);
        setIngredients(removed);
    };

    /**
     * Handles changing the amount of an ingredient
     * @param i the index of the ingredient to change
     * @param quantity the quantity to update the ingredient amount with
     */
    const handleChangeAmount = (i: number, quantity: number) => {
        setInFlux(true);
        const changed = [...ingredients];
        if (quantity >= 1) {
            changed[i].amount = quantity;
            setIngredients(changed);
        }
    };

    /**
     * Handles starting to add an ingredient
     */
    const handleAddIngredient = () => {
        setAddingIngredient(true);
    };

    /**
     * Handles selecting a inventory item
     * @param e the select element that changed
     */
    const handleSelectIng = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const itemName = e.target.value;
        setSelectedIng(itemName);
    };

    /**
     * Handles changing the quantity of a new ingredient to add
     * @param e the input element that changed
     */
    const handleChangeNewQuantity = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const quantity = e.target.value;
        if (parseInt(quantity) >= 1) {
            setNewQuantity(parseInt(quantity));
        }
    };

    /**
     * Handles confirming the adding of an ingredient
     */
    const handleConfirmIngredient = () => {
        setInFlux(true);
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

    /**
     * Handles canceling the add ingredient process
     */
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
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={form.description}
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
                        {inFlux && (
                            <button type="submit">
                                {exists ? 'Save Changes' : 'Add Item'}
                            </button>
                        )}
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
