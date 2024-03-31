'use client'
import styles from "@/app/page.module.css";

import SideBarMain from "@/components/SideBarMain";
import GlobalNavbar from "@/components/GlobalNavbar";
import CustomerNav from "@/app/customer/CustomerNav";

import customerStyles from "@/app/customer/page.module.css";
import CustomerMenuItem from "@/app/customer/CustomerMenuItem";
import React from "react";

export default function Customer() {
    // TODO: Change from static to dynamic from database
    let categoryNames: Array<string> = ["Burgers", "Drinks", "Sandwiches", "Baskets"];
    // TODO: Change from static to dynamic from database
    let menuItemsByCategory: Map<string, Array<string>> = new Map();
    menuItemsByCategory.set("Burgers", ["Hamburger", "Cheeseburger", "Meal"]);
    menuItemsByCategory.set("Drinks", ["Water", "Fountain Drink"]);
    menuItemsByCategory.set("Sandwiches", ["Grilled Cheese", "Ham Sandwich"]);
    menuItemsByCategory.set("Baskets", ["3 Tender Basket"]);
    
    // set default category
    let currCategory: string;
    let changeCategory: Function;
    [currCategory, changeCategory] = React.useState(categoryNames[0]);

    let showPopUp: boolean;
    let setPopUp: Function;
    [showPopUp, setPopUp] = React.useState(false);

    return (
      // TODO: Change to global styling
      <main className={styles.layout}>
        <CustomerNav/>
        <div className={styles.body}>
        <GlobalNavbar/>
        <div style={{width: "100%"}} className={customerStyles["main"]}>
            <nav id={customerStyles["categories"]}>
              <ul>
                {categoryNames.map((name) => 
                  <li key={name}><button onClick={() => changeCategory(name)}>{name}</button></li>
                )}
              </ul>
            </nav>
            
            {/* Menu items */}
            <div id={customerStyles["menu-items"]}>
              {menuItemsByCategory.get(currCategory)!.map((menuitem: string) =>
                <CustomerMenuItem key={menuitem} name={menuitem} onClick={() => setPopUp(true)}/>
              )}
            </div>

            {/* Pop up for adding to order */}
            { showPopUp ? 
                <section id={customerStyles["pop-up"]}>
                  {/* Exit button */}
                  <button 
                    className={customerStyles["exit-button"]} 
                    onClick={() => setPopUp(false)}
                    >
                    X
                  </button>
                </section>
            : null }
          </div>
      </div>

            
      </main>
    );
}
