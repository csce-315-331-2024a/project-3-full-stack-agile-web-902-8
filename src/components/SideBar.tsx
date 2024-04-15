import React from 'react';
import Link from 'next/link';
import styles from './component.module.css';

type SideProp = {
    names: string[];
    hrefs: string[];
    onClick: () => void;
};

function SideBar({ names, hrefs, onClick }: SideProp) {
    const handleClick = (index: number) => {
        if (names[index] === 'MenuBoard') {
            onClick(); // Call onClick function when MenuBoard link is clicked
        }
    };

    return (
        <nav className={styles.sidebar}>
            <ul>
                {names.map((link, i) => (
                    <li key={link}>
                        <Link href={hrefs[i]} passHref>
                            <div onClick={() => handleClick(i)}>{link}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideBar;
