import type { NextApiRequest, NextApiResponse } from 'next';
import { addOrder } from '@/lib/orders';
import { Order } from '@/lib/models';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method} /api/addOrder`);
    if (req.method === 'POST') {
        try {
            const order = req.body as Order;
            const success = await addOrder(order);
            res.status(200).json(success);
        } catch (error) {
            res.status(500).json(['Error adding order']);
        }
    } else {
        res.status(405).json(['Method not allowed']);
    }
}
