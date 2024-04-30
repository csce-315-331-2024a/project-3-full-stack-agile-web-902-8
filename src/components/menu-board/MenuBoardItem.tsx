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
        <div className={'grid w-full grid-cols-4 gap-2 border-2'}>
            <div className={'flex justify-center items-center'}>
                <Image
                    src={`/api/menuImages/${item.id}`}
                    alt={item.name}
                    width={200}
                    height={200}
                    className={'w-60 aspect-square grid-span'}
                />
            </div>
            <div className={'col-span-2'}>
                <h3 className={'text-[3rem] font-semibold'}>{item.name}</h3>
                <p className={'text-[2rem]'}>{item.description}</p>
            </div>
            <div className={'flex justify-center items-center text-[3rem]'}>
                <p>${item.price.toLocaleString('en-US', options)}</p>
            </div>
        </div>
    );
}

export default MenuBoardItem;
