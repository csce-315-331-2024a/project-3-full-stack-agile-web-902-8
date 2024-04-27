'use client';
import React from 'react';
import { frequentlySoldPairs } from '@/lib/models';

type ScrollableListProps = {
    items: frequentlySoldPairs[];
    title: string;
};

const ScrollableList = ({ items, title }: ScrollableListProps) => {
    // Style object for the container
    const listStyle: React.CSSProperties = {
        overflowY: 'scroll',
        maxHeight: '400px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        padding: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '0.5rem 0',
    };

    return (
        <div style={listStyle}>
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Item</th>
                        <th>Second Item</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(
                        (
                            getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason,
                            index
                        ) => (
                            <tr key={index}>
                                <td>
                                    {
                                        getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason.name1
                                    }
                                </td>
                                <td>
                                    {
                                        getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason.name2
                                    }
                                </td>
                                <td>
                                    {
                                        getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason.frequency
                                    }
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ScrollableList;
