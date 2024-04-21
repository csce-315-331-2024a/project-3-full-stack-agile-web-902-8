'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './component.module.css';
import revsLogo from '../../public/RLogo.ico'
import LogoutButton from './LogoutButton';

type HeadingProp = {
    names: string[];
    hrefs: string[];
    isLoggedIn: boolean;
};

function Heading({ names, hrefs, isLoggedIn }: HeadingProp) {
    const pathName = usePathname();
    return (
        <nav className={styles.navbar}>
            <Image src={revsLogo} alt="Rev's American Grill" />
            <ul>
                {names.map((link, i) => (
                    <li
                        key={link}
                        className={
                            pathName === hrefs[i] ? styles.navbarCurrent : ''
                        }
                    >
                        <Link href={hrefs[i]}>{link}</Link>
                    </li>
                ))}
            </ul>
            <LogoutButton isLoggedIn={isLoggedIn}/>
        </nav>
    );
}

export default Heading;
