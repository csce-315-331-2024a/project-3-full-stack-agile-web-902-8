import type { NextApiRequest, NextApiResponse } from 'next';
import { existsInInventory } from '@/lib/inventory';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const itemName: string | undefined = req.query.name as string | undefined;
        if (itemName == undefined)
            {
                return res.status(500).json(['Error fetching inventory item']);
            }
        const exists = await existsInInventory(itemName);
        res.status(200).json(exists);
    } catch (error) {
        res.status(500).json(['Error fetching inventory item']);
    }
}