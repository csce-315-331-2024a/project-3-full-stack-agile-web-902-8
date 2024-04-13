import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '../page.module.css';

export default function MenuBoard() {
  const router = useRouter();
  const items = ['Home', 'Logout'];
  const links = ['/', '/', '/', '/', '/', '/'];
  const categories = ['Value Meals', 'Sandwiches', 'Burgers', 'Baskets'];
  const textSize = parseInt(router.query.size, 10) || 16; // Ensure to parse with a radix of 10

  // Function to handle text enlargement
  const handleTextEnlarge = () => {
    const newSize = textSize + 1;
    // Update the query parameters and reload the page
    router.push({
      pathname: router.pathname,
      query: { ...router.query, size: newSize }
    });
  };

  const renderCategory = (category: string) => (
    <div className={styles.category} style={{ fontSize: `${textSize}px` }}>
        <h2>{category}</h2>
        <div className={styles.menuItems}>
            <p>Description of food item ... Price</p>
        </div>
    </div>
  );

  return (
      <main className={styles.main}>
          <div className={styles.description}>
              <Heading names={items} hrefs={links} />

              <button onClick={handleTextEnlarge}>Enlarge Text</button>
              
              <div className={styles.body}>
                  <DoubleText
                      block1={
                          <div>
                              <h1></h1>
                          </div>
                      }
                      block2={
                          <div>
                              <h1>MenuBoard Page</h1>
                              {categories.map(renderCategory)}
                              <div className={styles.limitedTimeOffers}>
                                  <h2>Limited Time Offers</h2>
                              </div>
                          </div>
                      }
                  />
              </div>
          </div>
      </main>
  );
}
