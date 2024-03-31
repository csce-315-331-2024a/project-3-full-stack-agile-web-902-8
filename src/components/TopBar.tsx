import React from "react";
import Navbar from "./Navbar"
import styles from "./component.module.css";

type TopProp = 
{
    names: string[];
    hrefs: string[];
}

function TopBar({names, hrefs}: TopProp)
{
    return(
        <div className={styles.navbar}>
            <Navbar names={names} hrefs={hrefs}/>
        </div>
    );
}

export default TopBar;
