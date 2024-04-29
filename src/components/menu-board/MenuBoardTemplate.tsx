'use client';

import componentStyles from '@/components/component.module.css';
import styles from './component.module.css';
import MenuBoardItem from './MenuBoardItem';
import { useState, useEffect } from 'react';
import { MenuItem } from '@/lib/models';

interface MenuBoardProps {
    title: string;
    categories: string[];
}

function MenuBoardTemplate({ title, categories }: MenuBoardProps) {
    const NUMSHOWN = 3;
    const TIMEINTERVAL = 5000; // ms

    const [items, setItems] = useState<MenuItem[]>([]);
    const [itemsShown, setItemsShown] = useState<MenuItem[]>([]);
    const [indexShown, setIndexShown] = useState<number>(0);

    const [isFetchingMenuItems, setIsFetchingMenuItems] = useState(false);

    useEffect(() => {
        async function fetchAllMenuItems() {
            setIsFetchingMenuItems(true);
            try {
                console.log(
                    "Fetching menu items may take a while sometimes, especially if you're running locally."
                );
                const response = await fetch('/api/getMenuItemsInSeason');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const menuItems: MenuItem[] = await response.json();
                const itemsInCategory = menuItems.filter(
                    (item) => categories.indexOf(item.type) > -1
                );
                setItems(itemsInCategory);
                console.log('Fetching should be done now.');
            } finally {
                setIsFetchingMenuItems(false);
            }
        }
        fetchAllMenuItems();
    }, [categories]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItemsShown(items.slice(indexShown, indexShown + NUMSHOWN));
            let newIndex =
                indexShown + NUMSHOWN >= items.length
                    ? 0
                    : indexShown + NUMSHOWN;
            setIndexShown(newIndex);
        }, TIMEINTERVAL);
        return () => {
            clearInterval(interval);
        };
    }, [items, indexShown]);

    return (
        <div className={'flex flex-col items-center h-screen'}>
            <h1 className={'text-4xl'}>{title}</h1>

            <div className={'flex-auto grid grid-rows-3 w-4/5 mx-auto'}>
                {isFetchingMenuItems ? (
                    <div className={'flex flex-row flex-wrap justify-start'}>
                        <button
                            className="text-background bg-text flex justify-center items-center m-4 w-fit h-fit rounded-2xl p-4 cursor-wait"
                            disabled={true}
                        >
                            Loading Menu Items...
                        </button>
                    </div>
                ) : (
                    itemsShown.map((item) => (
                        <MenuBoardItem key={item.id} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}

export default MenuBoardTemplate;
