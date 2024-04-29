'use client';

import MenuBoardTemplate from '@/components/menu-board/MenuBoardTemplate';

export default function MenuBoardMisc() {
    const title = "Sides, Beverages, and Desserts";
    const categories = ["Sides", "Beverages", "Shakes & More"];
    
    return (
        <MenuBoardTemplate title={title} categories={categories}/>
    )
}
