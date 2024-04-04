import React from 'react';
import styles from './component.module.css';

type TableProp = {
    heading: string[];
    rows: string[][];
};

function OrderTable({ heading, rows }: TableProp) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {heading.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => (
                        <tr key={index}>
                            {item.map((subItem, subIndex) => (
                                <td key={subIndex}>{subItem}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;
