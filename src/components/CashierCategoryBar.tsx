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
