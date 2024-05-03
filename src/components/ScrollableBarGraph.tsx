'use client';
import React from 'react';
import BarGraph, { BarData } from './BarGraph';

type ScrollableBarGraphProps = {
    data: BarData[];
    title: string;
    onGenerateGraph?: () => void; // Optional handler for generating graph
    onRefresh?: () => void; // Optional handler for refreshing data
};

/**
 * Generates a scrollable bar graph
 * @param param0 The props for the scrollable bar graph
 * @returns The scrollable bar graph
 */
const ScrollableBarGraph = ({
    data,
    title,
    onGenerateGraph,
    onRefresh,
}: ScrollableBarGraphProps) => {
    // Style object for the graph container

    return (
        <div className="bg-secondary/50 overflow-x-auto p-4 rounded-2xl h-[500px]">
            <BarGraph data={data} title={title} />
        </div>
    );
};

export default ScrollableBarGraph;
