// DONE

'use client';

import Heading from '@/components/Heading';
import React, { useState, useEffect } from 'react';
import { loginLevels } from '@/lib/config';
import { usePathname, useRouter } from 'next/navigation';

function openMenuBoardPages() {
    window.open('/menuboards/Burgers', '_blank');
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

    const { push } = useRouter();
    const pathname = usePathname();

    interface userScope {
        names: string[];
        hrefs: string[];
    }

    const [headingNames, setHeadingNames] = useState<string[]>(['Menu']);
    const [headingHrefs, setHeadingHrefs] = useState<string[]>([
        '/user/customer',
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, changeUserRole] = useState<string>('');

    // get the user login
    useEffect(() => {
        async function loginUser() {
            const response = await fetch('/api/oauthLogin');

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const type = await response.json();
            changeUserRole(type);
        }
        loginUser();
    }, []);

    useEffect(() => {
        const adminScope: userScope = {
            names: [
                'Menu',
                'Administrator',
                'Manager',
                'Cashier',
                'Kitchen',
                'Menu Board',
            ],
            hrefs: [
                '/user/customer',
                '/user/administrator',
                '/user/manager',
                '/user/cashier',
                '/user/kitchen',
                '/user/manager',
            ],
        };

        const managerScope: userScope = {
            names: ['Menu', 'Manager', 'Cashier', 'Kitchen', 'Menu Board'],
            hrefs: [
                '/user/customer',
                '/user/manager',
                '/user/cashier',
                '/user/kitchen',
                '/user/manager',
            ],
        };

        const cashierScope: userScope = {
            names: ['Menu', 'Cashier', 'Menu Board'],
            hrefs: ['/user/customer', '/user/cashier', '/user/manager'],
        };

        const cookScope: userScope = {
            names: ['Menu', 'Cook', 'Menu Board'],
            hrefs: ['/user/customer', '/user/kitchen', '/user/manager'],
        };

        const customerScope: userScope = {
            names: ['Menu'],
            hrefs: ['/user/customer'],
        };

        setIsLoggedIn(
            userRole != '' &&
                userRole != loginLevels.LOGIN_FAILED &&
                userRole != loginLevels.LOGIN_CUSTOMER
        );

        // set the scope the user sees
        if (userRole == loginLevels.LOGIN_ADMINISTRATOR) {
            setHeadingNames(adminScope.names);
            setHeadingHrefs(adminScope.hrefs);
        } else if (userRole == loginLevels.LOGIN_MANAGER) {
            setHeadingNames(managerScope.names);
            setHeadingHrefs(managerScope.hrefs);
        } else if (userRole == loginLevels.LOGIN_CASHIER) {
            setHeadingNames(cashierScope.names);
            setHeadingHrefs(cashierScope.hrefs);
        } else if (userRole == loginLevels.LOGIN_COOK) {
            setHeadingNames(cookScope.names);
            setHeadingHrefs(cookScope.hrefs);
        } else {
            setHeadingNames(customerScope.names);
            setHeadingHrefs(customerScope.hrefs);
        }

        let authRoute = false;
        for (let path of headingHrefs) {
            if (pathname.startsWith(path)) {
                authRoute = true;
                break;
            }
        }
        if (!authRoute) {
            push('/user/customer');
        }
    }, [userRole, pathname]);

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
