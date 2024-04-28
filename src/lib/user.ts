import psql, { transact } from '@/lib/database';
import { InventoryItem, User } from '@/lib/models';
import Error from '@/lib/error';
import postgres from 'postgres';

/**
 * Gets all users from the database
 *
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of all Users from the database
 */
export async function getAllUsers(tsql = psql): Promise<User[]> {
    return transact<User[], postgres.Error, any>(
        tsql,
        new Error('SQL error in getAllUsers', undefined),
        async (isql, _) => {
            const users: User[] = [];
            const result =
                await isql`SELECT username, role, hourly_salary, hours FROM users`;

            for (const row of result) {
                const currentUser = new User(
                    0,
                    row.username,
                    '',
                    row.role,
                    row.hourly_salary,
                    row.hours
                );
                users.push(currentUser);
            }
            return users;
        }
    );
}

/**
 * Adds or Updates a user in the database
 *
 * @param user The user to add or update in the database
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to an array of all Users from the database
 */
export async function addOrUpdateUser(
    user: User,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in getAllUsers', user),
        async (isql, _) => {
            const result =
                await isql`SELECT * FROM users WHERE username = ${user.username}`;
            if (result.length > 0) {
                const subResult =
                    await isql`UPDATE users SET role = ${user.role}, hourly_salary = ${user.hourlySalary}, hours = ${user.hours} WHERE username = ${user.username}`;
                return subResult.length > 0;
            } else {
                const subResult =
                    await isql`INSERT INTO users (username, role, hourly_salary, hours) VALUES (${user.username}, ${user.role}, ${user.hourlySalary}, ${user.hours})`;
                return subResult.length > 0;
            }
        }
    );
}

/**
 * Removes a user from the database
 *
 * @param tsql - The object representing an existing database connection or transaction.
 * @returns A Promise resolving to a boolean containing whether or not the user was deleted
 */
export async function removeUser(
    username: string,
    tsql = psql
): Promise<boolean> {
    return transact<boolean, postgres.Error, any>(
        tsql,
        new Error('SQL error in getAllUsers', username),
        async (isql, _) => {
            const result =
                await isql`DELETE FROM users WHERE username = ${username}`;
            return true;
        }
    );
}
