import React from 'react';
import Link from 'next/link';
import styles from './component.module.css';
import { usePathname } from 'next/navigation';

type SideProp = {
    names: string[];
    hrefs: string[];
};

function SideBar({ names, hrefs }: SideProp) {
    const pathName = usePathname();
    return (
        <nav className={styles.sidebar}>
            <ul>
                {names.map((link, i) => (
                    <li key={link}
                        className={
                            pathName === hrefs[i] ? styles.sidebarCurrent : ''
                        }    
                    >
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
