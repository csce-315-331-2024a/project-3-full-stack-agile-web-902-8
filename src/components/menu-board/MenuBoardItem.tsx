import Image from 'next/image';
import { MenuItem } from '@/lib/models';

interface MenuItemProp {
    item: MenuItem;
}

export function MenuBoardItem({ item }: MenuItemProp) {
    // Specifying options for formatting
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (
        <div className={'grid w-full grid-cols-4 gap-2'}>
            <Image
                src={`/api/menuImages/${item.id}`}
                alt={item.name}
                width={200}
                height={200}
                className={'h-40 w-40 grid-span'}
            />
            <div className={'col-span-2'}>
                <h3 className={'text-2xl font-semibold'}>{item.name}</h3>
                <p className={'text-lg'}>{item.description}</p>
            </div>
            <div className={'flex justify-center items-start text-2xl'}>
                <p>${item.price.toLocaleString('en-US', options)}</p>
            </div>
        </div>
    );
}

export default MenuBoardItem;
