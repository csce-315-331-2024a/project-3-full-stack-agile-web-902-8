'use client';

import styles from '@/app/page.module.css';
import pageStyles from '@/app/menuboards/page.module.css';
import componentStyles from '@/components/component.module.css';
import MenuBoardItem from '@/components/MenuBoardItem';
import { useState, useEffect } from 'react';
import { MenuItem } from '@/lib/models';

export default function MenuBoardSandwiches() {
    const categories = ['Sandwiches', 'Baskets'];
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
                const itemsInCategory = menuItems.filter((item) => categories.indexOf(item.type) > -1);
                setItems(itemsInCategory);
                console.log('Fetching should be done now.');
            } finally {
                setIsFetchingMenuItems(false);
            }
        }
        fetchAllMenuItems();
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setItemsShown(items.slice(indexShown, indexShown + NUMSHOWN));
        let newIndex = indexShown + NUMSHOWN >= items.length ? 0 : indexShown + NUMSHOWN;
        setIndexShown(newIndex);
      }, TIMEINTERVAL);
      return () => {
        clearInterval(interval);
      };
    }, [items, indexShown]);

    return (
        <main className={pageStyles.main}>
            <h1>Sandwiches and Baskets</h1>

            <div className={pageStyles["menu-item-grid"]}>
            {isFetchingMenuItems ? 
                <div className={componentStyles.itemGrid}>
                    <button
                        className={
                            componentStyles.itemButton +
                            ' ' +
                            componentStyles.card +
                            ' ' +
                            componentStyles.loading
                        }
                        disabled={true}
                    >
                        Loading Menu Items...
                    </button>
                </div> : 

                itemsShown.map((item) =>
                    <MenuBoardItem key={item.id} item={item}/>
                )
            }
            </div>
        </main>
    );
}

