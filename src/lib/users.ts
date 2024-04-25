import psql, { transact } from '@/lib/database';
import { User } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * @param username The username of the user logging in.
 * @param password The password of the user logging in, can be NULL if using oauth.
 * @return If the order was successfully added to the database.
 */
export async function getUser(username: string, password: string, tsql = psql): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL Error in ', undefined, o),
        async (isql, _) => {
            const orderInsertResult = await isql`
                INSERT INTO orders (timestamp, discount, total, status) 
                VALUES (${o.timestamp}, ${o.discount}, ${o.total}, ${o.status}) 
                RETURNING id;
            `;
            if (orderInsertResult.count === 0) {
                console.error('Order insert failed', o);
                throw new Error('Order insert failed', undefined, o);
            }
            const id = orderInsertResult[0].id;

            for (const item of o.items) {
                const result = await isql`
                    INSERT INTO order_items (order_id, item_id, qty) 
                    VALUES (${id}, ${item.item.id}, ${item.quantity});
                `;
                if (result.count === 0) {
                    console.error('Order item insert failed', item);
                    throw new Error('Order item insert failed', item, o);
                }
            }

            console.log('Order added: ', id);
            return true;
        }
    );
}
