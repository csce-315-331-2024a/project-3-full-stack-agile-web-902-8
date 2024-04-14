import styles from '@/components/component.module.css';
import { CustomerRecommendedItem } from '@/components/CustomerMenuItem';
import { MenuItem } from '@/lib/models';

interface RecommendedBarProp {
    menuItems: MenuItem[];
    addToOrder: (menuItem: MenuItem) => void;
}

function CustomerRecommendedBar({ menuItems, addToOrder }: RecommendedBarProp) {
    return (
        <ul className={styles.bar + ' ' + styles.customer}>
            {menuItems.map((menuItem: MenuItem) => (
                <li key={menuItem.id}>
                    <CustomerRecommendedItem
                        item={menuItem}
                        addToOrder={addToOrder}
                    />
                </li>
            ))}
        </ul>
    );
}

export default CustomerRecommendedBar;
