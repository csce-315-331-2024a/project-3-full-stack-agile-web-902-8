'use client'

import Heading from '@/components/Heading';
import React, { useState } from 'react';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: In the future, the links presented will be determined by the user's position in Rev's
    const [headingNames, setHeadingNames] = useState<string[]>(['Customer', 'Cashier', 'Manager', 'Menu Board']);
    const [headingHrefs, setHeadingHrefs] = useState<string[]>(['/user/customer', '/user/cashier', '/user/manager', '/user/manager']);

    return (
        <>
        <Heading names={headingNames} hrefs={headingHrefs} />
        { children }
        </>
    );
}
