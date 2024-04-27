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
        backgroundColor: '#a05a2c', // Adjust the color to match your design
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    };

    // Enhanced styling for the title for darker appearance
    const titleStyle: React.CSSProperties = {
        backgroundColor: '#804000', // Darker shade for the title background
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        fontSize: '1.5rem',
        borderTopLeftRadius: '10px', // Optional for rounded corners
        borderTopRightRadius: '10px', // Optional for rounded corners
    };

    return (
        <div style={listStyle}>
            <div style={titleStyle}>{title}</div>
            <table>
                <thead>
                    <tr>
                        <th style={headerStyle}>Item 1</th>
                        <th style={headerStyle}>Item 2</th>
                        <th style={headerStyle}>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
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
