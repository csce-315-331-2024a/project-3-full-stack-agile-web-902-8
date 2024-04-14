'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import styles from '../page.module.css';
import {
    ScaleProvider,
    useScale,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '../zoom.client';
import { NextApiRequest } from 'next';

interface Category {
    id: string;
    name: string;
    description: string;
}

const RenderCategory: React.FC<Category & { scale: number }> = ({
    id,
    name,
    description,
    scale,
}) => {
    return (
        <div
            key={id}
            className={styles.category}
            style={{ transform: `scale(${scale})` }}
        >
            <h2>{name}</h2>
            <div className={styles.menuItems}>
                <p>{description}</p>
            </div>
        </div>
    );
};

const MenuBoard: React.FC = () => {
    const { scale } = useScale();
    const items = ['Home', 'Logout'];
    const links = ['/', '/', '/', '/', '/', '/'];
    const categories: Category[] = [
        {
            id: '1',
            name: 'Value Meals',
            description: 'Description of Value Meals',
        },
        {
            id: '2',
            name: 'Sandwiches',
            description: 'Description of Sandwiches',
        },
        { id: '3', name: 'Burgers', description: 'Description of Burgers' },
        { id: '4', name: 'Baskets', description: 'Description of Baskets' },
    ];

    // Use internal state for initialScale with a default or cookie-fetched value
    const [initialScale, setInitialScale] = useState(1);

    useEffect(() => {
        const fetchedScale = parseFloat(nookies.get(null).initialScale || '1');
        setInitialScale(fetchedScale);
    }, []);

    // Dynamically import ZoomIn, ZoomOut, and ResetZoom with no server-side rendering
    const ZoomInWithClientSide = dynamic(
        () => import('../zoom.client').then((mod) => mod.ZoomIn),
        { ssr: false }
    );
    const ZoomOutWithClientSide = dynamic(
        () => import('../zoom.client').then((mod) => mod.ZoomOut),
        { ssr: false }
    );
    const ResetZoomWithClientSide = dynamic(
        () => import('../zoom.client').then((mod) => mod.ResetZoom),
        { ssr: false }
    );

    return (
        <ScaleProvider initialScale={initialScale}>
            <main
                className={styles.main}
                style={{ transform: `scale(${scale})` }}
            >
                <div className={styles.description}>
                    <Heading names={items} hrefs={links} />
                    <ZoomInWithClientSide />
                    <ZoomOutWithClientSide />
                    <ResetZoomWithClientSide />
                    <div className={styles.body}>
                        <DoubleText
                            block1={
                                <div>
                                    <h1></h1>
                                </div>
                            }
                            block2={
                                <div>
                                    <h1>MenuBoard Page</h1>
                                    {categories.map((category) => (
                                        <RenderCategory
                                            key={category.id}
                                            {...category}
                                            scale={scale}
                                        />
                                    ))}
                                    <div className={styles.limitedTimeOffers}>
                                        <h2>Limited Time Offers</h2>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </main>
        </ScaleProvider>
    );
};

export default MenuBoard;
