'use client';

import MenuBoardTemplate from '@/components/menu-board/MenuBoardTemplate';

export default function MenuBoardSandwiches() {
    const title = "Limited Time Offers";
    const categories = ["Limited Time Offers"];
    
    return (
        <MenuBoardTemplate title={title} categories={categories}/>
    )
}
