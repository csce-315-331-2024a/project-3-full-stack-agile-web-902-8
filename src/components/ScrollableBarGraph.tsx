'use client';
import React from 'react';
import BarGraph, { BarData } from './BarGraph';

type ScrollableBarGraphProps = {
    data: BarData[];
    title: string;
    onGenerateGraph?: () => void; // Optional handler for generating graph
    onRefresh?: () => void; // Optional handler for refreshing data
};

const ScrollableBarGraph = ({
    data,
    title,
    onGenerateGraph,
    onRefresh,
}: ScrollableBarGraphProps) => {
    // Style object for the graph container
    const graphStyle: React.CSSProperties = {
        overflowX: 'auto',
        padding: '1rem',
        height: '500px',
        backgroundColor: '#fff', // Assuming a white background
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example shadow, adjust as necessary
        margin: '0.5rem 0', // Adds margin to the top and bottom
    };

    return (
        <div style={graphStyle}>
            <BarGraph data={data} title={title} />
        </div>
    );
};

export default ScrollableBarGraph;
