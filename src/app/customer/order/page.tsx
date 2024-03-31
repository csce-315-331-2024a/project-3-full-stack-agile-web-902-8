import styles from "@/app/page.module.css";
import customerStyles from "@/app/customer/page.module.css";
import GlobalNavbar from "@/components/GlobalNavbar";
import CustomerNav from "@/app/customer/CustomerNav";

export default function CustomerOrder() {
    return (
      // TODO: Change to global styling
      <main className={customerStyles.main}>
        <h1>Customer</h1>

        <CustomerNav/>
        <GlobalNavbar/>

        {/* Order box with entries */}
        <div>
          uhhhhhhhhhhhhhh
        </div>

      </main>
    );
}

