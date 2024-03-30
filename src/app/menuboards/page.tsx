import React from "react";
import Heading from "@/components/Heading";
import PageButton from "@/components/PageButton";
import DoubleText from "@/components/DoubleText";
import SideBar from "@/components/SideBar";
import styles from '../page.module.css';


export default function MenuBoard() {
  const items = ['Home', 'Logout'];
  const links = ['/', '/', '/', '/', '/', '/'];
  const categories = ['Value Meals', 'Sandwiches', 'Burgers', 'Baskets'];


  const renderCategory = (category: string) => (
    <div className={styles.category}>
      <h2>{category}</h2>
      {/* Placeholder for the menu items in this category */}
      <div className={styles.menuItems}>
        <p>Description of food item ... Price</p>
        {/* More items can be added here */}
      </div>
    </div>
  );


  const handleRefresh = () => {
    console.log('Refresh button clicked'); // Placeholder for actual logic
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* Render the heading with navigation items */}
        <Heading names={items} hrefs={links} />
        
        {/* Render the body of the page */}
        <div className={styles.body}>
          <DoubleText
            block1={<SideBar names={categories} hrefs={links} />}
            block2={
              <div>
                <h1>MenuBoard Page</h1>
                
                {/* Render categories */}
                {categories.map(renderCategory)}
                {/* Placeholder for Limited Time Offers */}
                <div className={styles.limitedTimeOffers}>
                  <h2>Limited Time Offers</h2>
                  {/* Limited time offers items will go here */}
                </div>
              </div>
            }
          />
        </div>
      </div>
    </main>
  );
}