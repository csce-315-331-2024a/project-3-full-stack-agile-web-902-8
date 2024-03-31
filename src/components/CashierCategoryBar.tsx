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
    setCategory: (category: string) => void;
}

function CashierCategoryBar({categories, category, setCategory} : CashierCategoryBarProps){
    return (
        <div className={componentStyles.categoryBar}>
            {categories.map((categoryName) => (
                <CashierCategoryButton categoryName={categoryName} setCategory={setCategory} key={categoryName} />
            ))}
        </div>
    );
}

function CashierCategoryButton({categoryName, setCategory} : CashierCategoryButtonProps){
    function handleClick(){
        setCategory(categoryName);
    }

    return (
        <button className={componentStyles.categoryButton} onClick={handleClick}>
            {categoryName}
        </button>
    );
}

export default CashierCategoryBar;