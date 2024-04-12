import type { NextApiRequest, NextApiResponse } from 'next';
import { addOrUpdateInventoryItem } from '@/lib/inventory';
import { InventoryItem } from '@/lib/models';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const passedItem: InventoryItem | undefined = req.query.item as InventoryItem | undefined;
        if (passedItem == undefined)
        {
            return res.status(500).json(['Error fetching inventory item']);
        }
        const exists = await addOrUpdateInventoryItem(passedItem);
        res.status(200).json(exists);
    } catch (error) {
        res.status(500).json(['Error fetching inventory item']);
    }
}