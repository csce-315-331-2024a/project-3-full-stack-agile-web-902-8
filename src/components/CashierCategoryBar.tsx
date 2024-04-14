'use client';

import React from 'react';
import componentStyles from './component.module.css';

interface CashierCategoryBarProps {
    isFetchingMenuTypes: boolean;
    categories: string[];
    category: string;
    setCategory: (category: string) => void;
}

interface CashierCategoryButtonProps {
    categoryName: string;
    category: string;
    setCategory: (category: string) => void;
}

function CashierCategoryBar({
    isFetchingMenuTypes,
    categories,
    category,
    setCategory,
}: CashierCategoryBarProps) {
    if(isFetchingMenuTypes){
        return(
            <div className={componentStyles.categoryBar + ' ' + componentStyles.loading}>
                <button className={componentStyles.categoryButton + ' ' + componentStyles.card + ' ' + componentStyles.loading}
                disabled={true}>Loading Menu Categories...</button>
            </div>
        );
    }
    return (
        <div className={componentStyles.categoryBar}>
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
}: CashierCategoryButtonProps) {
    function handleClick() {
        setCategory(categoryName);
    }

    const isActive = categoryName === category;
    const buttonStyles = isActive
        ? componentStyles.categoryButton + ' ' + componentStyles.active
        : componentStyles.categoryButton;

    return (
        <button className={buttonStyles} onClick={handleClick}>
            {categoryName}
        </button>
    );
}

export default CashierCategoryBar;
