import React from 'react';
import Link from 'next/link';
import styles from './component.module.css';

type SideProp = {
    names: string[];
    hrefs: string[];
};

function SideBar({ names, hrefs }: SideProp) {
    return (
        <nav className={styles.sidebar}>
            <ul>
                {names.map((link, i) => (
                    <li key={link}>
                        <Link href={hrefs[i]}>
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideBar;
