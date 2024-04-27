// DONE

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideProp = {
    names: string[];
    hrefs: string[];
    className?: string;
};

function SideBar({ names, hrefs, className }: SideProp) {
    const pathName = usePathname();
    return (
        <nav className={'w-fit h-full z-40 flex flex-col justify-start items-center bg-text shadow-2xl ' + className}>
            <ul className='flex flex-col justify-start items-center'>
                {names.map((link, i) => (
                    <li
                        key={link}
                        className='flex w-full'
                    >
                        <Link className={'text-background px-8 py-4 flex justify-center items-center text-center relative w-full overflow-hidden sideLink' + ( 
                            pathName === hrefs[i] ? ' current' : '' )} href={hrefs[i]}>{link}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideBar;
