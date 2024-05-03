// ALL TAILWIND

'use client';

import React from 'react';

interface CustomerCategoryBarProps {
    isFetchingMenuTypes: boolean;
    categories: string[];
    category: string;
    setCategory: (category: string) => void;
}

interface CustomerCategoryButtonProps {
    categoryName: string;
    category: string;
    setCategory: (category: string) => void;
}

/**
 * A functional component that renders a navigational bar for selecting menu categories. It displays a loading state or a list of category buttons.
 * @param isFetchingMenuTypes - Indicates if the menu categories are currently being fetched.
 * @param categories - The list of category names to display.
 * @param category - The currently selected category.
 * @param setCategory - Function to update the selected category.
 * @return A React element representing either a loading state or a navigational bar of menu categories.
 */
function CustomerCategoryBar({
    isFetchingMenuTypes,
    categories,
    category,
    setCategory,
}: CustomerCategoryBarProps) {
    if (isFetchingMenuTypes) {
        return (
            <ul className="w-full min-h-24 border-text border-solid border-2 rounded-2xl p-4 flex justify-center items-center text-background bg-text hover:cursor-wait">
                <button
                    className="bg-text text-background p-4 rounded-2xl hover:cursor-wait"
                    disabled={true}
                >
                    Loading Menu Categories...
                </button>
            </ul>
        );
    }

    return (
        <ul className="bg-secondary w-full min-h-24 border-text border-solid border-2 rounded-2xl p-4 flex justify-stretch items-stretch">
            {categories.map((categoryName) => (
                <li key={categoryName}>
                    <CustomerCategoryButton
                        categoryName={categoryName}
                        category={category}
                        setCategory={setCategory}
                    />
                </li>
            ))}
        </ul>
    );
}

/**
 * A button component that allows the user to select a specific category. Highlights if it's the selected category.
 * @param categoryName - The name of the category this button represents.
 * @param category - The currently selected category.
 * @param setCategory - Function to set the currently selected category.
 * @return A React button element that updates the category selection on click.
 */
function CustomerCategoryButton({
    categoryName,
    category,
    setCategory,
}: CustomerCategoryButtonProps) {
    function handleClick() {
        setCategory(categoryName);
    }

    return (
        <button
            className={
                'w-full bg-secondary h-full flex justify-center items-center duration-200 p-4 active:bg-background/50' +
                (categoryName === category ? ' active:bg-background/50' : '')
            }
            onClick={handleClick}
        >
            {categoryName}
        </button>
    );
}

export default CustomerCategoryBar;
