import React from "react";
import Navbar from "./Navbar"
import styles from "./component.module.css";

type SideProp = 
{
    names: string[];
    hrefs: string[];
}

function SideBar({names, hrefs}: SideProp)
{
    return(
        <div className={styles.sidebar}>
            <Navbar names={names} hrefs={hrefs}/>
        </div>
    );
}

export default SideBar;
