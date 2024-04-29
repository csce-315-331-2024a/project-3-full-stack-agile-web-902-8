// DONE

'use client';

import Heading from '@/components/Heading';
import React, { useState } from 'react';

function openMenuBoardPages() {
    window.open('/menuboards/Burgs', '_blank');
    window.open('/menuboards/Meals_Limited', '_blank');
    window.open('/menuboards/Misc', '_blank');
    window.open('/menuboards/Sandwiches_Baskets', '_blank');
}

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: In the future, the links presented will be determined by the user's position in Rev's
    // TODO: Manage the user's login status

    const [headingNames, setHeadingNames] = useState<string[]>([
        'Customer',
        'Cashier',
        'Kitchen',
        'Manager',
        'Administrator',
        'Menu Board',
    ]);
    const [headingHrefs, setHeadingHrefs] = useState<string[]>([
        '/user/customer',
        '/user/cashier',
        '/user/kitchen',
        '/user/manager',
        '/user/administrator',
        '/user/manager',
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div className="w-screen h-screen grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr]">
            <Heading
                names={headingNames}
                hrefs={headingHrefs}
                isLoggedIn={isLoggedIn}
                openMenuBoardPages={openMenuBoardPages}
                className="col-span-2 row-span-1"
            />
            {children}
        </div>
    );
}
