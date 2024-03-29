import styles from "@/app/page.module.css";
import customerStyles from "@/app/customer/page.module.css";
import CustomerNav from "@/app/customer/customer-nav";

export default function CustomerOrder() {
    return (
      // TODO: Change to global styling
      <main className={customerStyles.main}>
        <h1>Customer</h1>

        <CustomerNav/>


      </main>
    );
}

