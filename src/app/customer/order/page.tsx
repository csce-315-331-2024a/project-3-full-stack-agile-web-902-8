import styles from "@/app/page.module.css";
import Link from "next/link";

export default function CustomerOrder() {
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
      </main>
    );
}

