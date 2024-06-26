// ALL TAILWIND

import { CustomerRecommendedItem } from '@/components/CustomerMenuItem';
import { OrderEntry } from '@/components/CustomerOrderSidebar';
import { MenuItem } from '@/lib/models';

interface RecommendedBarProp {
    isFetchingMenuItems: boolean;
    menuItems: MenuItem[];
    currentOrder: OrderEntry[];
    setCurrentOrder: (currentOrder: OrderEntry[]) => void;
}

/**
 * Generates the recommendation bar for customer
 * @param param0 The props for the recommendation bar
 * @returns The recommendation bar for customer
 */
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
                    className="text-background bg-text flex justify-center items-center duration-200 m-4 rounded-2xl p-4 hover:cursor-wait"
                    disabled={true}
                >
                    Loading Recommendations...
                </button>
            </div>
        );
    }

    return (
        <ul className="bg-secondary w-full min-h-24 border-text border-solid border-2 rounded-2xl px-4 grid h-fit grid-cols-[repeat(6,1fr)] gap-2">
            {menuItems.map((menuItem: MenuItem) => (
                <li
                    className="w-full h-fit flex justify-center items-center"
                    key={menuItem.id}
                >
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
