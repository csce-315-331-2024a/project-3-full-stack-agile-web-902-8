import React from 'react';
import Navbar from './Navbar';
import styles from './component.module.css';

function GlobalNavbar () {
    const names = ["Manager", "Cashier", "Customer", "Menuboard", "Logout"]
    const links = ["/manager", "/cashier", "/customer", "/menuboard", "/"]

    return (
        <div className={styles.sidebar}>
            <Navbar names={names} hrefs={links}/>
        </div>
    )
}


export default GlobalNavbar;
