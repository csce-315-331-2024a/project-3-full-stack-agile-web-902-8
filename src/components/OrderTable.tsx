import React from 'react';

type TableProp = {
    heading: string[];
    rows: string[][];
};

function OrderTable({ heading, rows }: TableProp) {
    return (
        <table className="w-full border-collapse text-sm">
            <thead>
                <tr>
                    {heading.map((item, index) => (
                        <th
                            className={
                                'bg-primary text-background text-left px-4 py-2' +
                                (index === 0 ? ' rounded-tl-2xl' : '') +
                                (index === heading.length - 1
                                    ? ' rounded-tr-2xl'
                                    : '')
                            }
                            key={index}
                        >
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((item, index) => (
                    <tr className="hover:bg-secondary/70" key={index}>
                        {item.map((subItem, subIndex) => (
                            <td
                                className="px-4 py-2 border-b-text border-b-2"
                                key={subIndex}
                            >
                                {subItem}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrderTable;
