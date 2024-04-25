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
    const maxValue = Math.max(...data.map((item) => item.value), 10);
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Java Swing component is likely not maintaining aspect ratio by default
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 24, // Adjust font size as needed
                },
            },
            legend: {
                display: false, // Assuming you're showing a simple bar chart without a legend
            },
            tooltip: {
                // Customizing tooltip to match your Java functionality (if needed)
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis', // Set to the actual label you need
                    font: {
                        size: 18, // Adjust font size as needed
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis', // Set to the actual label you need
                    max: maxValue,
                    font: {
                        size: 18, // Adjust font size as needed
                    },
                },
                beginAtZero: true,
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
        // Customizing the look of the bars
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        // Animation settings, if you want to mimic the Java version's lack of animation
        animation: {
            duration: 0,
        },
    };

    const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                label: title,
                data: data.map((item) => item.value),
                backgroundColor: data.map((item) => item.color),
            },
        ],
    };

    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
