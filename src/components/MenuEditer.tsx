import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Ingredient, InventoryItem, MenuItem, Seasonal } from '@/lib/models';

interface MenuEditerProps {
    className?: string;
}

/**
 * Creates the component for editing menu items
 * @return the comopnent for editing menu items
 */
function MenuEditer({ className }: MenuEditerProps) {
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
        weather: '',
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
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

    /**
     * Fetched the menu item names
     */
    async function fetchMenuItems() {
        const response = await fetch('/api/getAllMenuItemNames');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const menuItemNames = await response.json();
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
        setInventoryNames(sortedNames);
        const existingNames: string[] = [];
        ingredients.forEach((element) => {
            existingNames.push(element.inventoryItem.name);
        });
        const filtered = sortedNames.filter(
            (name: string) => !existingNames.includes(name)
        );
        setInventoryNames(filtered);
    }, [ingredients]);

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

        const startObject = new Date(startDate);
        const endObject = new Date(endDate);
        startObject.setHours(startObject.getHours() - 5);
        endObject.setHours(endObject.getHours() - 5);
        const startTimestamp = Math.floor(startObject.getTime());
        const endTimeStamp = Math.floor(endObject.getTime());

        const menuItem = new MenuItem(
            0,
            form.name,
            form.type,
            form.description,
            Number(form.price),
            Number(form.netPrice),
            Number(form.popularity),
            ingredients,
            null,
            form.weather
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
            new Seasonal(startTimestamp, endTimeStamp, recurring),
            form.weather
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

        if (Number(form.price) <= 0 || Number(form.popularity) <= 0) {
            alert('Cannot have negative or 0 values for price or popularity');
        } else if (
            form.name == '' ||
            form.description == '' ||
            form.type == ''
        ) {
            alert('Name, description, and type cannot be empty');
        } else if (
            form.weather != 'hot' &&
            form.weather != 'cold' &&
            form.weather != 'wet' &&
            form.weather != 'normal'
        ) {
            alert("Weather must be either 'hot', 'cold', 'wet', or 'normal'");
        } else {
            if (selected == 'new') {
                const confirm = window.confirm(
                    'Are you sure you want to add this item?'
                );
                if (confirm) {
                    addMenuItem();
                    setForm({
                        id: 0,
                        name: '',
                        type: '',
                        weather: '',
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
            console.log(parseItem.weather);
            setForm((form) => ({
                ...form,
                weather: parseItem.weather,
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
                weather: '',
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
        if (needsRefresh) {
            setNeedsRefresh(false);
        }
    }, [selected, exists, needsRefresh]);

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

        const confirm = window.confirm(
            'Are you sure you want to remove this item'
        );
        if (confirm) {
            removeMenuItem();
            setSelected('');
            setVisible(false);
            setItemNames([]);
            fetchMenuItems();
            fetchMenuItems();
        }
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

    const handleRefresh = () => {
        setNeedsRefresh(true);
    };

    return (
        <div
            className={
                'flex flex-col items-center justify-start gap-4 ' + className
            }
        >
            <button type="button" onClick={handleRefresh}>
                Reset Changes
            </button>

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
                    Add a Menu Item
                </option>
            </select>

            {visible && (
                <form
                    className="flex flex-col items-left justify-start gap-4 rounded-2xl border-l-[0.5rem] border-l-accent p-4 bg-secondary/20"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-[2rem] font-bold">
                        {selected === 'new' ? 'New Item' : selected}
                    </h2>

                    <label className="text-[1.25rem] font-bold">
                        Ingredients
                    </label>
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="bg-accent text-background text-left px-4 py-2 rounded-tl-2xl">
                                    Remove
                                </th>
                                <th className="bg-accent text-background text-left px-4 py-2">
                                    Name
                                </th>
                                <th className="bg-accent text-background text-left px-4 py-2 rounded-tr-2xl">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((entry, index) => (
                                <tr
                                    className="hover:bg-secondary/70"
                                    key={index}
                                >
                                    <td className="px-4 py-2 border-b-text border-b-2">
                                        <button
                                            className="rounded-2xl bg-text h-6 w-6 text-background duration-200 hover:bg-background hover:text-text"
                                            onClick={() =>
                                                handleRemoveIngredient(index)
                                            }
                                            type="button"
                                        >
                                            X
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border-b-text border-b-2">
                                        {entry.inventoryItem.name}
                                    </td>
                                    <td className="px-4 py-2 border-b-text border-b-2">
                                        <input
                                            className="rounded-2xl p-2 pl-3 bg-text text-right text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-1"
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
                            {ingredients.length === 0 && (
                                <tr className="hover:bg-secondary/70">
                                    <td className="px-4 py-2 border-b-text border-b-2">
                                        No ingredients
                                    </td>
                                    <td className="px-4 py-2 border-b-text border-b-2"></td>
                                    <td className="px-4 py-2 border-b-text border-b-2"></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button
                        className="text-background bg-accent rounded-2xl p-4 w-fit mx-auto duration-200 hover:text-text hover:bg-accent/70"
                        type="button"
                        onClick={handleAddIngredient}
                    >
                        Add an ingredient
                    </button>

                    {addingIngredient && (
                        <div className="flex flex-col items-left justify-start gap-4 rounded-2xl border-l-[0.5rem] border-l-accent p-4 bg-secondary/20">
                            <label className="flex flex-row items-center justify-between gap-4">
                                New Ingredient:
                                <select
                                    className="bg-text text-background duration-200 hover:cursor-pointer rounded-2xl flex justify-center items-center w-fit h-fit p-4"
                                    id="dropdown"
                                    value={selectedIng}
                                    onChange={handleSelectIng}
                                >
                                    <option
                                        className="bg-text text-background font-sans"
                                        value=""
                                        disabled
                                    >
                                        Select an option
                                    </option>
                                    {inventoryNames.map((option, index) => (
                                        <option
                                            className="bg-text text-background font-sans"
                                            key={index}
                                            value={option}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-row items-center justify-between gap-4">
                                New Ingredient Quantity:
                                <input
                                    className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                                    type="number"
                                    name="newQuantity"
                                    value={newQuantity}
                                    onChange={handleChangeNewQuantity}
                                />
                            </label>
                            <div className="flex flex-row items-center justify-center gap-4 w-full">
                                <button
                                    className="text-background bg-primary rounded-2xl p-4 duration-200 hover:text-text hover:bg-primary/70"
                                    type="button"
                                    onClick={handleConfirmIngredient}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="text-text bg-secondary rounded-2xl p-4 duration-200 hover:text-text hover:bg-secondary/30"
                                    type="button"
                                    onClick={handleCancelIngredient}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

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
                        Type:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="text"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Weather:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="text"
                            name="weather"
                            value={form.weather}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Description:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Price:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Net Price:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="netPrice"
                            value={form.netPrice || 0}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Popularity:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="number"
                            name="popularity"
                            value={form.popularity}
                            //onChange={handleChange}
                        />
                    </label>
                    <label className="flex flex-row items-center justify-between gap-4">
                        Seasonal:
                        <input
                            className="rounded-2xl p-4 bg-text text-background duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                            type="checkbox"
                            id="seasonal"
                            checked={form.seasonal}
                            onChange={handleCheck}
                        />
                    </label>

                    {form.seasonal && (
                        <div className="flex flex-col items-left justify-start gap-4 rounded-2xl border-l-[0.5rem] border-l-accent p-4 bg-secondary/20">
                            <label className="flex flex-row items-center justify-between gap-4">
                                Select a starting date:
                                <input
                                    className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                                    type="datetime-local"
                                    id="startDate"
                                    value={startDate}
                                    onChange={handleChangeStart}
                                />
                            </label>
                            <label className="flex flex-row items-center justify-between gap-4">
                                Select a starting date:
                                <input
                                    className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                                    type="datetime-local"
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleChangeEnd}
                                />
                            </label>
                            <label className="flex flex-row items-center justify-between gap-4">
                                Recurring:
                                <input
                                    className="rounded-2xl p-4 bg-text text-background font-mono duration-200 focus:outline-none focus:border-l-[0.5rem] focus:border-l-primary focus:pl-2"
                                    type="checkbox"
                                    id="recurring"
                                    checked={recurring}
                                    onChange={handleCheckRecurring}
                                />
                            </label>
                        </div>
                    )}

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
                    </div>
                </form>
            )}
        </div>
    );
}

export default MenuEditer;
