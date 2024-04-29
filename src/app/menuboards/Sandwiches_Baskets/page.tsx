'use client';

import MenuBoardTemplate from '@/components/menu-board/MenuBoardTemplate';

export default function MenuBoardSandwiches() {
    const title = 'Sandwiches, Baskets, and Value Meals';
    const categories = ['Sandwiches', 'Baskets', 'Value Meals'];

    return <MenuBoardTemplate title={title} categories={categories} />;
}
