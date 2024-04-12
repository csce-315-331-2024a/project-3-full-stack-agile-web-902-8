import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllInventoryItemNames } from '@/lib/inventory';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log("It begins")
        const inventoryItems = await getAllInventoryItemNames()
        res.status(200).json(inventoryItems);
    } catch (error) {
        //res.status(500).json(['Error fetching inventory names'])
        if(error instanceof Error)
        {  
            console.log('Error fetching');
            res.status(500).json({error: 'Error fetching inventory items', message: error.message});
        }
    }
}