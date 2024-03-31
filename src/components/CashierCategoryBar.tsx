'use client';

import React from 'react';
import componentStyles from './component.module.css';

// TODO: consider using an active button style

interface CashierCategoryBarProps{
    categories: string[];
    category: string;
    setCategory: (category: string) => void;
}

interface CashierCategoryButtonProps{
    categoryName: string;
    category: string;
    setCategory: (category: string) => void;
}

function CashierCategoryBar({categories, category, setCategory} : CashierCategoryBarProps){
    return (
        <div className={componentStyles.categoryBar}>
            {categories.map((categoryName) => (
                <CashierCategoryButton categoryName={categoryName} category={category} setCategory={setCategory} key={categoryName} />
            ))}
        </div>
    );
}

function CashierCategoryButton({categoryName, category, setCategory} : CashierCategoryButtonProps){
    function handleClick(){
        setCategory(categoryName);
    }

    const isActive = categoryName === category;
    const buttonStyles = isActive ? componentStyles.categoryButton + ' ' + componentStyles.active : componentStyles.categoryButton;

    return (
        <button className={buttonStyles} onClick={handleClick}>
            {categoryName}
        </button>
    );
}

export default CashierCategoryBar;