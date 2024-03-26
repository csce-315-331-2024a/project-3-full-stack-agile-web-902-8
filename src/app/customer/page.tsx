import styles from "@/app/page.module.css";
import Link from "next/link";

/**
 * Content for the customer page
 */
export default function Customer() {
    return (
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Link href="/customer">
            home
          </Link>
          <Link href="/customer/order">
            order
          </Link>
          <Link href="/customer/checkout">
            checkout
          </Link>
        </nav>
        
        {/* TODO: Add styling for the categories */}
        <nav className={styles.nav}>
          
        </nav>
      </main>
    );
}
