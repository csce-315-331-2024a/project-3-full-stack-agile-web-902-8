//import Image from "next/image";
import styles from "./page.module.css";

import Link from 'next/link';

export default function HomePage() {

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {}
        <Link href="/manager" legacyBehavior>
          <a className={styles.link}>Manager </a>
        </Link>
        <Link href="/cashier" legacyBehavior>
          <a className={styles.link}>Cashier </a>
        </Link>
        <Link href="/customer" legacyBehavior>
          <a className={styles.link}>Customer </a>
        </Link>
        <Link href="/menuboards" legacyBehavior>
          <a className={styles.link}>MenuBoards</a>
        </Link>
      </nav>
      {}
    </div>
  );
}