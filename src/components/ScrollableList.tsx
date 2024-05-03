import React from 'react';
import { frequentlySoldPairs } from '@/lib/models';

type ScrollableListProps = {
    items: frequentlySoldPairs[];
    title: string;
};

/**
 * Creates a scrollable list
 * @param param0 The props for the scrollable list
 * @returns The scrollable list
 */
const ScrollableList = ({ items, title }: ScrollableListProps) => {
    return (
        <div className="overflow-y-scroll max-h-[400px] bg-secondary/50 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>{' '}
            {/* Darker title text */}
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr>
                        <th className="bg-primary text-background font-bold text-left py-3 px-4 rounded-tl-2xl">
                            Item 1
                        </th>
                        <th className="bg-primary text-background font-bold text-left py-3 px-4">
                            Item 2
                        </th>
                        <th className="bg-primary text-background font-bold text-right py-3 px-4 rounded-tr-2xl">
                            Frequency
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr className="hover:bg-secondary/70" key={index}>
                            <td className="py-1 px-4 border-b-text border-b-[1px]">
                                {item.item1Name}
                            </td>
                            <td className="py-1 px-4 border-b-text border-b-[1px]">
                                {item.item2Name}
                            </td>
                            <td className="text-right font-mono py-1 px-4 border-b-text border-b-[1px]">
                                {item.frequency}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScrollableList;
