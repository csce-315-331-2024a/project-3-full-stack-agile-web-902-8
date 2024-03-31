import React from "react";
import Link from "next/link";

type NavbarProps = 
{
    names: string[];
    hrefs: string[];
}

function Navbar({names, hrefs}: NavbarProps)
{
    return(
        <nav>
            <ul>
                {names.map((link, i) =>(
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

export default Navbar;
