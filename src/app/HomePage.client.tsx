// src/app/HomePage.client.tsx
import { useRouter } from 'next/router';
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {}
        <button onClick={() => router.push('/manager')}>Manager Portal</button>
        <button onClick={() => router.push('/cashier')}>Cashier Portal</button>
        <button onClick={() => router.push('/customer')}>Customer Portal</button>
        <button onClick={() => router.push('/menuboards')}>Menu Boards</button>
      </nav>
      {}
    </div>
  );
}
