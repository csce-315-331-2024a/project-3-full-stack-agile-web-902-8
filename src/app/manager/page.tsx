import React from "react";
import Heading from "@/components/Heading";
import PageButton from "@/components/PageButton";
import DoubleText from "@/components/DoubleText";
import SideBar from "@/components/SideBar";
import styles from '../page.module.css';

export default function Manager() {
  const Items = ['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout'];
  const Links = ['/', '/', '/', '/', '/', '/'];
  const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
  const Links2 = ['/', '/', '/', '/'];
  
  return (
    <main className={styles.main}>
      <div className = {styles.description}>
        <div>
          <Heading names={Items} hrefs={Links}/>
        </div>
        <div className={styles.description}>
          <DoubleText 
            block1 = <SideBar names={Items2} hrefs={Links2}/>
            block2 = 
            <div>
            <h1>Manager Page</h1>

            <PageButton>Refresh</PageButton>

            <p>This is the manager page content.</p></div>/>
        </div>
      </div>
    </main>
  );
}
