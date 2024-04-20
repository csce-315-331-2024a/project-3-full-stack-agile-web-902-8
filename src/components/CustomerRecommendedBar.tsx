import styles from '@/components/component.module.css';
import { CustomerRecommendedItem } from '@/components/CustomerMenuItem';
import { MenuItem } from '@/lib/models';

interface RecommendedBarProp {
    menuItems: MenuItem[];
    onClick: () => any;
}

function CustomerRecommendedBar({ menuItems, onClick }: RecommendedBarProp) {
    return (
        <ul className={styles.bar + ' ' + styles.customer}>
            {menuItems.map((menuItem: MenuItem) => (
                <li key={menuItem.name}>
                    <CustomerRecommendedItem
                        item={menuItem}
                        onClick={onClick}
                    />
                </li>
            ))}
        </ul>
    );
}

export default CustomerRecommendedBar;
