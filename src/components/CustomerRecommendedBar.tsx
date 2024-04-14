import styles from '@/components/component.module.css';
import { CustomerRecommendedItem } from '@/components/CustomerMenuItem';
import { OrderEntry } from '@/components/CustomerOrderSidebar';
import { MenuItem } from '@/lib/models';

interface RecommendedBarProp {
    menuItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

function CustomerRecommendedBar({ menuItems, currentOrder, setCurrentOrder }: RecommendedBarProp) {
    return (
        <ul className={styles.bar + ' ' + styles.customer}>
            {menuItems.map((menuItem: MenuItem) => (
                <li key={menuItem.id}>
                    <CustomerRecommendedItem
                        item={menuItem}
                        currentOrder={currentOrder}
                        setCurrentOrder={setCurrentOrder}
                    />
                </li>
            ))}
        </ul>
    );
}

export default CustomerRecommendedBar;
