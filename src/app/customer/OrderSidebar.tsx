import React from 'react';
import styles from './page.module.css';

interface OrderSidebarProp {

}

function OrderSidebar() {
    const pages = ['home', 'order', 'checkout', 'logout'];
    const hrefs = ['/customer', '/customer/order', '/customer/checkout', '/'];

    return (
        <div className={styles.sidebar}>
            <div className={styles.orderbox}>
                
            </div>
            <button>
                Checkout
            </button>
        </div>
    )
}

export default OrderSidebar;
