import styles from "@/app/page.module.css";
import customerStyles from "@/app/page/customer/page.module.css";
import CustomerNav from "@/app/customer/customer-nav";

export default function CustomerOrder() {
    return (
      <main className={styles.main}>
        <h1>Customer</h1>

        <CustomerNav/>
      </main>
    );
}

