'use client'
import styles from "@/app/page.module.css";
import customerStyles from "@/app/customer/page.module.css";
import CustomerMenuItem from "@/components/CustomerMenuItem";
import CustomerNav from "@/app/customer/customer-nav";
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

    return (
      <main className={styles.main}>
        <h1>Customer</h1>

        <CustomerNav/>
        
        <nav id={customerStyles["categories"]}>
          <ul>
            {categoryNames.map((name) => 
              <li key={name}><button onClick={() => changeCategory(name)}>{name}</button></li>
            )}
          </ul>
        </nav>
        
        {/* Menu items */}
        <div>
          {menuItemsByCategory.get(currCategory)!.map((menuitem: string) =>
            <CustomerMenuItem key={menuitem} name={menuitem}/>
          )}
        </div>
      </main>
    );
}
