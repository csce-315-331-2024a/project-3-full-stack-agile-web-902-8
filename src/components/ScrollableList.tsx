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

    // Enhanced styling for headers
    const headerStyle: React.CSSProperties = {
        backgroundColor: '#a05a2c', // Assuming this is a valid color string
        color: 'white', // Also should be a valid color string
        padding: '10px',
        textAlign: 'left' as 'left', 
    };
    const rowStyle = {
        color: '#333', // dark text color for rows
        backgroundColor: '#f9f9f9', // light background for rows, for contrast
        borderBottom: '1px solid #ddd', // if you want borders between rows
    };

    return (
        <div style={listStyle}>
            <h2 style={{ color: '#333' }}>{title}</h2> {/* Darker title text */}
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Item 1</th>
                        <th style={headerStyle}>Item 2</th>
                        <th style={headerStyle}>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={rowStyle}>
                            <td>{item.item1Name}</td>
                            <td>{item.item2Name}</td>
                            <td>{item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScrollableList;
