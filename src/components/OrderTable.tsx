import React from 'react';

type TableProp = {
    heading: string[];
    rows: string[][];
};

function OrderTable({ heading, rows }: TableProp) {
    return (
        <div className='p-4 bg-primary/50 rounded-2xl'>
            <table className='w-full border-collapse'>
                <thead>
                    <tr>
                        {heading.map((item, index) => (
                            <th className='border-2 border-text p-2' key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => (
                        <tr key={index}>
                            {item.map((subItem, subIndex) => (
                                <td className='border-2 border-text p-2' key={subIndex}>{subItem}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;
