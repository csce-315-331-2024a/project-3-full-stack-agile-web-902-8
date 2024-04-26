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
    indexAxis: 'y' as const, 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 24
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
          font: {
            size: 18
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Items',
          font: {
            size: 18
          }
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    elements: {
      bar: {
        borderWidth: 1,
        barThickness: 'flex',
      }
    },
    animation: {
      duration: 0
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

