'use client';

import React from 'react';
import styles from './page.module.css';

// TODO: consider using an active button style

interface CustomerCategoryBarProps {
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
    categories,
    category,
    setCategory,
}: CustomerCategoryBarProps) {
    return (
        <ul className={styles.bar} id={styles.categories}>
            {categories.map((categoryName) => (
                <li><CustomerCategoryButton
                    categoryName={categoryName}
                    category={category}
                    setCategory={setCategory}
                    key={categoryName}
                /></li>
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

    const isActive = categoryName === category;
    const buttonStyles = isActive
        ? styles["category-button"] + ' ' + styles.active
        : styles["category-button"];

    return (
        <button className={buttonStyles} onClick={handleClick}>
            {categoryName}
        </button>
    );
}

export default CustomerCategoryBar;
