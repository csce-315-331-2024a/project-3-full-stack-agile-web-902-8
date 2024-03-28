import styles from "@/app/page.module.css";
import customerStyles from "@/app/page/customer/page.module.css";
import Link from "next/link";

export default function CustomerOrder() {
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
      </main>
    );
}

