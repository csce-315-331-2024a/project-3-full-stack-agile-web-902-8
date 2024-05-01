// DONE

'use client';

import React from 'react';

interface CashierCategoryBarProps {
    isFetchingMenuTypes: boolean;
    categories: string[];
    category: string;
    setCategory: (category: string) => void;
    className?: string;
}

interface CashierCategoryButtonProps {
    categoryName: string;
    category: string;
    setCategory: (category: string) => void;
    className?: string;
}

/**
 * A functional component that renders a navigational bar for selecting menu categories. It displays a loading state or a collection of category buttons.
 * @param props - Properties passed to the component as specified in CashierCategoryBarProps.
 * @return A React element representing either a loading state or a navigational bar of menu categories.
 */
function CashierCategoryBar({
    isFetchingMenuTypes,
    categories,
    category,
    setCategory,
    className,
}: CashierCategoryBarProps) {
    if (isFetchingMenuTypes) {
        return (
            <div
                className={
                    'bg-text text-background cursor-wait rounded-2xl flex flex-row flex-wrap justify-center items-center w-fit h-fit px-4 ' +
                    className
                }
            >
                <button
                    className="cursor-wait flex justify-center items-center duration-200 p-4"
                    disabled={true}
                >
                    Loading Menu Categories...
                </button>
            </div>
        );
    }
    return (
        <div
            className={
                'bg-secondary rounded-2xl flex flex-row flex-wrap justify-center items-center w-fit h-fit px-4 ' +
                className
            }
        >
            {categories.map((categoryName) => (
                <CashierCategoryButton
                    categoryName={categoryName}
                    category={category}
                    setCategory={setCategory}
                    key={categoryName}
                />
            ))}
        </div>
    );
}

/**
 * A button component that allows the user to select a specific category. Highlights if it's the selected category.
 * @param props - Properties passed to the component as specified in CashierCategoryButtonProps.
 * @return A React button element that updates the category selection on click.
 */
function CashierCategoryButton({
    categoryName,
    category,
    setCategory,
    className,
}: CashierCategoryButtonProps) {
    function handleClick() {
        setCategory(categoryName);
    }

    return (
        <button
            className={
                'flex justify-center items-center duration-200 p-4 hover:bg-background/30 ' +
                (categoryName === category
                    ? 'bg-background/70 hover:bg-background/70 '
                    : '') +
                className
            }
            onClick={handleClick}
        >
            {categoryName}
        </button>
    );
}

export default CashierCategoryBar;
