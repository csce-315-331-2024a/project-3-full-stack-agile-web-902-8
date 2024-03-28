'use client'
import styles from "@/app/page.module.css";
import customerStyles from "@/app/page/customer/page.module.css";
import Link from "next/link";
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

        <nav id={customerStyles["customer-navbar"]}>
          <ul>
          <li><Link href="/page/customer">
            home
          </Link></li>
          <li><Link href="/page/customer/order">
            order
          </Link></li>
          <li><Link href="/page/customer/checkout">
            checkout
          </Link></li>
          </ul>
        </nav>
        
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
            <p key={menuitem}>{menuitem}</p>
          )}
        </div>
      </main>
    );
}
