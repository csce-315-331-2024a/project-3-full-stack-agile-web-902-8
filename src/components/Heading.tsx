import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

type HeadingProp = 
{
    names: string[];
    hrefs: string[];
}

function Heading({names, hrefs}: HeadingProp)
{
    return(
        <nav className={styles.navbar}>
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

export default Heading;
