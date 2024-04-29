
// DONE

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import revsLogo from '../../public/RLogo.ico';
import LoginButton from './LoginButton';
import { loginLevels } from '@/lib/config';


type HeadingProp = {
    names: string[];
    hrefs: string[];
    isLoggedIn: boolean;
    openMenuBoardPages: () => void;
    className?: string;
};

function Heading({
    names,
    hrefs,
    isLoggedIn,
    openMenuBoardPages,
    className,
}: HeadingProp) {
    const pathName = usePathname();
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

    return (
        <nav
            className={
                'w-full z-50 flex flex-row justify-between items-center bg-background shadow-xl ' +
                className
            }
        >
            <Image
                className="h-12 w-auto mx-4"
                src={revsLogo}
                alt="Rev's American Grill"
            />
            <ul className="flex flex-row flex-wrap items-center justify-start w-full h-full">
                {names.map((link, i) =>
                    link === 'Menu Board' ? (
                        <li
                            className="flex h-full"
                            key={link}
                            onClick={openMenuBoardPages}
                        >
                            <a className="px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden navLink">
                                {link}
                            </a>
                        </li>
                    ) : (
                        <li key={link} className="flex h-full">
                            <Link
                                className={
                                    'px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden navLink' +
                                    (pathName === hrefs[i] ? ' current' : '')
                                }
                                href={hrefs[i]}
                            >
                                {link}
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <LoginButton
                isLoggedIn={
                    userRole != '' &&
                    userRole != loginLevels.LOGIN_FAILED &&
                    userRole != loginLevels.LOGIN_CUSTOMER
                }
            />
        </nav>
    );
}

export default Heading;
