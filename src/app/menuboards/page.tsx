import React from 'react';
import dynamic from 'next/dynamic';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import styles from '../page.module.css';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { TextSizeProvider } from './menu.client';

interface Category {
    id: string;
    name: string;
}

interface MenuBoardProps {
    initialTextSize: number;
}

// Import the TextEnlarger dynamically with SSR disabled
const TextEnlarger = dynamic(() => import('./menu.client'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});


const MenuBoard: React.FC<MenuBoardProps> = ({ initialTextSize }) => {
    const items = ['Home', 'Logout'];
    const links = ['/', '/', '/', '/', '/', '/'];
    const categories: Category[] = [
        { id: '1', name: 'Value Meals' },
        { id: '2', name: 'Sandwiches' },
        { id: '3', name: 'Burgers' },
        { id: '4', name: 'Baskets' }
    ];

    const RenderCategory = ({ id, name }: Category) => (
        <div key={id} className={styles.category}>
            <h2>{name}</h2>
            <div className={styles.menuItems}>
                <p>Description of food item ... Price</p>
            </div>
        </div>
    );

    return (
        <TextSizeProvider> {/* Wrap the contents in the TextSizeProvider */}
            <main className={styles.main} style={{ fontSize: `${initialTextSize}px` }}>
                <div className={styles.description}>
                    <Heading names={items} hrefs={links} />
                    <TextEnlarger />
                    <div className={styles.body}>
                        <DoubleText
                            block1={<div><h1></h1></div>}
                            block2={
                                <div>
                                    <h1>MenuBoard Page</h1>
                                    {categories.map(category => <RenderCategory key={category.id} id={category.id} name={category.name} />)}
                                    <div className={styles.limitedTimeOffers}>
                                        <h2>Limited Time Offers</h2>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </main>
        </TextSizeProvider>
    );
};

export default MenuBoard;