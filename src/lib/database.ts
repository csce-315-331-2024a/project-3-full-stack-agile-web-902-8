import postgres from 'postgres';

import GlobalConfig from '@/lib/config';

const psql = postgres({
    host: GlobalConfig.db.host,
    port: Number(GlobalConfig.db.port),
    database: GlobalConfig.db.database,
    username: GlobalConfig.db.username,
    password: GlobalConfig.db.password
});

export default psql

/**
 * Starts a new transaction if sql is the root psql object, otherwise continues
 * that transaction, and then passes the sql transaction object to func for execution.
 *
 * @param sql The sql object to execute func on.
 * @param func The function representing the queries to be run on sql.
 */
export async function beginOrContinue<TResult>(sql: postgres.Sql | postgres.TransactionSql, func: (a: postgres.TransactionSql) => TResult | Promise<TResult>) {
    if (sql === psql) {
        return sql.begin<TResult>(func);
    }
    return func(sql as postgres.TransactionSql);
}
