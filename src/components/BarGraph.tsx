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
        indexAxis: 'y' as const, // Correctly typed as 'y' for horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 24,
                },
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
                    },
                },
                // Removing any max value or suggestedMax option
                // This allows Chart.js to dynamically scale the axis based on the data
            },
            y: {
                title: {
                    display: true,
                    text: 'Items', // This is the title for your items axis
                    font: {
                        size: 18,
                    },
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
                borderWidth: 1, // The border width of the bars
                // barThickness: 'flex' is not a valid property, you can remove it or adjust it to a number or 'flexible'
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
