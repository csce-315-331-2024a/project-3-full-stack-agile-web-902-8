import React from 'react';
import DoubleText from '@/components/DoubleText';
import styles from '@/app/page.module.css';

export default function MenuBoard() {
    const categories = ['Value Meals', 'Sandwiches', 'Burgers', 'Baskets'];

    const renderCategory = (category: string) => (
        <div className={styles.category}>
            <h2>{category}</h2>
            {/* Placeholder for the menu items in this category */}
            <div className={styles.menuItems}>
                <p>Description of food item ... Price</p>
                {/* More items can be added here */}
            </div>
        </div>
    );

    const handleRefresh = () => {
        console.log('Refresh button clicked'); // Placeholder for actual logic
    };

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                {/* Render the body of the page */}
                <div className={styles.body}>
                    <DoubleText
                        block1={
                            <div>
                                <h1></h1>
                            </div>
                        }
                        block2={
                            <div>
                                <h1>Burgers</h1>

                                {/* Render categories */}
                                {categories.map(renderCategory)}
                                {/* Placeholder for Limited Time Offers */}
                                <div className={styles.limitedTimeOffers}>
                                    <h2>Limited Time Offers</h2>
                                    {/* Limited time offers items will go here */}
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </main>
    );
}
