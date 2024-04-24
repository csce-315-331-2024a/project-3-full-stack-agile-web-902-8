'use client';
import React from 'react';


type ListItem = {
    firstItem: string;
    secondItem: string;
    frequency: number;
  };
  
  type ScrollableListProps = {
    items: ListItem[];
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
            {items.map((item: ListItem, index: number) => (
              <tr key={index}>
                <td>{item.firstItem}</td>
                <td>{item.secondItem}</td>
                <td>{item.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ScrollableList;