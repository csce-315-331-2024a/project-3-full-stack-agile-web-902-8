import styles from '@/components/component.module.css';
import { CustomerRecommendedItem } from '@/components/CustomerMenuItem';
import { OrderEntry } from '@/components/CustomerOrderSidebar';
import { MenuItem } from '@/lib/models';

interface RecommendedBarProp {
    isFetchingMenuItems: boolean;
    menuItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

function CustomerRecommendedBar({
    isFetchingMenuItems,
    menuItems,
    currentOrder,
    setCurrentOrder,
}: RecommendedBarProp) {
    if (isFetchingMenuItems) {
        return (
            <div>
                <button
                    className={
                        styles.itemButton +
                        ' ' +
                        styles.card +
                        ' ' +
                        styles.loading
                    }
                    disabled={true}
                >
                    Loading Recommendations...
                </button>
            </div>
        );
    }

    return (
        <ul
            className={
                styles.bar +
                ' ' +
                styles['recommended-items'] +
                ' ' +
                styles.customer
            }
        >
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
