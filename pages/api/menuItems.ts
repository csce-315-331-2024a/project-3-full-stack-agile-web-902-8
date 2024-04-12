import type { NextApiRequest, NextApiResponse } from 'next';
import { getMenuItemsInSeason } from '@/lib/menu';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('GET /api/menuItems');
    try {
        const menuItems = await getMenuItemsInSeason();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json(['Error fetching menu items']);
    }
}
