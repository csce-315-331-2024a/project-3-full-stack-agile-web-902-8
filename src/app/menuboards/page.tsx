// Import necessary libraries and components

// Import necessary libraries and components
import React from 'react';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import styles from '../page.module.css';
import { TextSizeProvider } from './menu.client';
import { NextApiRequest } from 'next';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface MenuBoardProps {
  initialTextSize: number;
}

// Dynamically import TextEnlarger with no server-side rendering
const TextEnlargerWithClientSide = dynamic(
  () => import('./menu.client').then((mod) => mod.default),
  { ssr: false }
);

const RenderCategory: React.FC<Category & { textSize: number }> = ({ id, name, description, textSize }) => {
  return (
    <div key={id} className={styles.category}>
      <h2 style={{ fontSize: `${textSize}px` }}>{name}</h2>
      <div className={styles.menuItems}>
        <p style={{ fontSize: `${textSize}px` }}>{description}</p>
      </div>
    </div>
  );
};

const MenuBoard: React.FC<MenuBoardProps> = ({ initialTextSize }) => {
  const items = ['Home', 'Logout'];
  const links = ['/', '/', '/', '/', '/', '/'];
  const categories: Category[] = [
    { id: '1', name: 'Value Meals', description: 'Description of Value Meals' },
    { id: '2', name: 'Sandwiches', description: 'Description of Sandwiches' },
    { id: '3', name: 'Burgers', description: 'Description of Burgers' },
    { id: '4', name: 'Baskets', description: 'Description of Baskets' }
  ];

  return (
    <TextSizeProvider initialTextSize={initialTextSize}>
      <main className={styles.main}>
        <div className={styles.description}>
          <Heading names={items} hrefs={links} />
          <TextEnlargerWithClientSide />
          <div className={styles.body}>
            <DoubleText
              block1={<div><h1></h1></div>}
              block2={
                <div>
                  <h1>MenuBoard Page</h1>
                  {categories.map((category) => (
                    <RenderCategory
                      key={category.id}
                      {...category}
                      textSize={initialTextSize} 
                    />
                  ))}
                  <div className={styles.limitedTimeOffers}>
                    <h2>Limited Time Offers</h2>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </main>
    </TextSizeProvider>
  );
};

// Loader function to fetch initial data from the server side
export async function loader({ params, request }: { params: any; request: NextApiRequest }) {
  const cookies = nookies.get({ req: request });
  const initialTextSize = parseInt(cookies.textSize || '16', 10);

  // Return the data as props
  return { props: { initialTextSize } };
}

export default MenuBoard;
