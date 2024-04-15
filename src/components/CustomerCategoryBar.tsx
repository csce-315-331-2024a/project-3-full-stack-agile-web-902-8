'use client';

import React from 'react';
import styles from '@/components/component.module.css';

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
            <ul
                className={
                    styles.bar + ' ' + styles.customer + ' ' + styles.loading
                }
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button
                    className={
                        styles.categoryButton +
                        ' ' +
                        styles.card +
                        ' ' +
                        styles.loading
                    }
                    disabled={true}
                >
                    Loading Menu Categories...
                </button>
            </ul>
        );
    }

    return (
        <ul
            className={styles.bar + ' ' + styles.customer}
            id={styles.categories}
        >
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

    const isActive = categoryName === category;
    const buttonStyles = isActive
        ? styles['category-button'] + ' ' + styles.active
        : styles['category-button'];

    return (
        <button
            className={buttonStyles + ' ' + styles.customer}
            onClick={handleClick}
        >
            {categoryName}
        </button>
    );
}

export default CustomerCategoryBar;
