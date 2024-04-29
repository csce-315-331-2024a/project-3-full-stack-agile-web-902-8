'use client';

import MenuBoardTemplate from '@/components/menu-board/MenuBoardTemplate';

export default function MenuBoardSandwiches() {
    const title = 'Burgers';
    const categories = ['Burgers'];

    return <MenuBoardTemplate title={title} categories={categories} />;
}
