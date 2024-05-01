// BarGraph.tsx
'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export type BarData = {
    label: string;
    value: number;
    color: string;
};

export type BarGraphProps = {
    data: BarData[];
    title: string;
};

const BarGraph = ({ data, title }: BarGraphProps) => {
    const options = {
        indexAxis: 'y' as const, // 'as const' narrows the string type to the literal 'y'
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 24,
                    weight: 'bold' as const, // 'as const' narrows the string type to the literal 'bold'
                },
                color: '#f7e7ed', // Define the color for the title
            },
            legend: {
                display: false, // Since you don't need a legend
            },
            tooltip: {
                enabled: true, // To show tooltips
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Start scale at zero
                title: {
                    display: true,
                    text: 'Frequency',
                    font: {
                        size: 18,
                        weight: 'bold' as const, // 'as const' narrows the string type to the literal 'bold'
                    },
                    color: '#f7e7ed', // Define the color for the axis title
                },
                ticks: {
                    color: '#f7e7ed', // Darker axis labels
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Items', // This is the title for your items axis
                    font: {
                        size: 18,
                        weight: 'bold' as const, // 'as const' narrows the string type to the literal 'bold'
                    },
                    color: '#f7e7ed', // Define the color for the axis title
                },
                ticks: {
                    color: '#f7e7ed', // Darker axis labels
                },
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        },
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        animation: {
            duration: 0, // Disable animation
        },
    };

    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                data: data.map((item) => item.value),
                backgroundColor: data.map((item) => item.color),
            },
        ],
    };

    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
