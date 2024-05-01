'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import revsLogo from '../../public/RLogo.ico';
import LoginButton from './LoginButton';
import GoogleTranslate from './GoogleTranslate';

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

    return (
        <nav
            className={
                'w-full h-min z-50 flex flex-row items-center bg-background shadow-xl ' +
                className
            }
        >
            <Image
                className="h-12 w-auto mx-4"
                src={revsLogo}
                alt="Rev's American Grill"
            />
            <ul className="flex flex-row flex-wrap items-center justify-start w-full">
                {names.map((link, i) =>
                    link === 'Menu Board' ? (
                        <li
                            className="flex h-full"
                            key={link}
                            onClick={openMenuBoardPages}
                        >
                            <a className="px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden max-xl:px-4 max-lg:px-2 max-sm:text-xs sm:navLink max-sm:py-1">
                                {link}
                            </a>
                        </li>
                    ) : (
                        <li key={link} className="flex h-full">
                            <Link
                                className={
                                    'px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden max-xl:px-4 max-lg:px-2 max-sm:text-xs sm:navLink max-sm:py-1 ' +
                                    (pathName.startsWith(hrefs[i])
                                        ? ' current'
                                        : '')
                                }
                                href={hrefs[i]}
                            >
                                {link}
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <GoogleTranslate />
            <LoginButton isLoggedIn={isLoggedIn} />
        </nav>
    );
}

export default Heading;
