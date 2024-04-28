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
