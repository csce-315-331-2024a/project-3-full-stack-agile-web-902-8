import React from "react";
import PageButton from "@/components/PageButton";
import DoubleText from "@/components/DoubleText";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import GlobalNavbar from "@/components/GlobalNavbar";
import OrderTable from "@/components/OrderTable";
import styles from '../page.module.css';

export default function Manager() {
  const Items = ['Home', 'Menu', 'Inventory', 'Order History', 'Reports', 'Logout'];
  const Links = ['/manager', '/manager', '/manager', '/manager', '/manager', '/'];

  const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
  const tableBody = [['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
                    ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2']]; 
  
  return (
    <main className={styles.main}>
      <div className = {styles.description}>
        <div>
          <TopBar names={Items} hrefs={Links}/>
        </div>
        <div className={styles.body}>
          <DoubleText 
            block1 = <GlobalNavbar/>
            block2 = 
            <div>
            <h1>Manager Page</h1>

            <PageButton>Refresh</PageButton>
            {/*<p>
              TimeStamp | Order_Id | Discount | Total
  </p>*/}
                  <OrderTable heading = {tableHead} rows = {tableBody}/>
        </div>/>
        </div>
      </div>
    </main>
  );
}
