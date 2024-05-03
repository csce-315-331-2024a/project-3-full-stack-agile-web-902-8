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

/**
 * Generates the header for the pages
 * @param param0 The props for the header
 * @returns The header for the pages
 */
function Heading({
    names,
    hrefs,
    isLoggedIn,
    openMenuBoardPages,
    className,
}: HeadingProp) {
    const pathName = usePathname();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className={'xl:flex xl:justify-between py-2 ' + className}>
            <div className="w-auto z-50 flex flex-row justify-between items-center bg-background shadow-xl">
                <Image
                    className="h-12 w-auto mx-4"
                    src={revsLogo}
                    alt="Rev's American Grill"
                />
                <div className="xl:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="block text-white text-white outline-none mr-4"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={
                    'flex-wrap items-center justify-between w-full flex-col xl:flex xl:flex-row ' +
                    (isOpen ? 'flex' : 'hidden')
                }
            >
                <ul className="flex flex-wrap h-full w-full xl:w-auto">
                    {names.map((link, i) =>
                        link === 'Menu Board' ? (
                            <li
                                className="flex justify-center h-full basis-1/2 grow xl:basis-auto xl:justify-normal"
                                key={link}
                                onClick={openMenuBoardPages}
                            >
                                <a className="px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden navLink">
                                    {link}
                                </a>
                            </li>
                        ) : (
                            <li
                                key={link}
                                className="flex justify-center h-full basis-1/2 grow xl:basis-auto"
                            >
                                <Link
                                    className={
                                        'px-8 py-4 flex items-center justify-center text-center relative h-full cursor-pointer overflow-hidden navLink' +
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
                <ul className="flex flex-wrap w-full xl:w-auto">
                    <li className="flex justify-center h-full basis-1/2 grow xl:basis-auto">
                        <GoogleTranslate></GoogleTranslate>
                    </li>
                    <li className="flex justify-center h-full basis-1/2 grow xl:basis-auto">
                        <LoginButton isLoggedIn={isLoggedIn} />
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Heading;
