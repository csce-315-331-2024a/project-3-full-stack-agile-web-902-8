import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllMenuTypes } from '@/lib/menu';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const menuTypes = await getAllMenuTypes();
        res.status(200).json(menuTypes);
    } catch (error) {
        res.status(500).json(['Error fetching menu types']);
    }
}
