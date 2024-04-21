'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './component.module.css';

type HeadingProp = {
    names: string[];
    hrefs: string[];
};

function Heading({ names, hrefs }: HeadingProp) {
    const pathName = usePathname();

    return (
        <nav className={styles.navbar}>
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
        </nav>
    );
}

export default Heading;
