'use client'

import Heading from '@/components/Heading';
import React, { useState } from 'react';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: In the future, the links presented will be determined by the user's position in Rev's
    // TODO: Manage the user's login status
    const [headingNames, setHeadingNames] = useState<string[]>(['Customer', 'Cashier', 'Manager', 'Menu Board']);
    const [headingHrefs, setHeadingHrefs] = useState<string[]>(['/user/customer', '/user/cashier', '/user/manager', '/user/manager']);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <>
        <Heading names={headingNames} hrefs={headingHrefs} isLoggedIn={isLoggedIn}/>
        { children }
        </>
    );
}
