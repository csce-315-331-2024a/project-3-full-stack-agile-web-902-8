import postgres from 'postgres';

import GlobalConfig from '@/lib/config';
import Error from '@/lib/error';

const psql = postgres({
    host: GlobalConfig.db.host,
    port: Number(GlobalConfig.db.port),
    database: GlobalConfig.db.database,
    username: GlobalConfig.db.username,
    password: GlobalConfig.db.password
});

export default psql

/**
 * Starts a new "transaction" at this level, such that any rollback inside func only rolls back the changes made inside func.
 * This allows nested calls to not interefere with each other.
 * If there was already a transaction, then it issues a savepoint and continues the transaction.
 * If there was not yet a transaction, then it starts a transaction.
 *
 * @param sql The sql object to execute func on.
 * @param func The function representing the queries to be run on sql.
 */
export async function beginOrContinue<TResult>(sql: postgres.Sql | postgres.TransactionSql, func: (a: postgres.TransactionSql) => TResult | Promise<TResult>) {
    if ("savepoint" in sql) {
        return (sql as postgres.TransactionSql).savepoint(func);
    }
    return sql.begin(func);
}

const ABORT_SIGNAL = Symbol("__blubywaff_abort_signal");

type aborter<T> = {
    [ABORT_SIGNAL]: true,
    returnValue: T,
}

/**
 * Wraps database interactions to ensure that synchronization and errors are handled correctly.
 *
 * Takes one mandatory type parameter TResult, which specify the return type of the query function.
 * Takes two optional type parameters:
 * - The context type for the error (see Error from lib/error)
 * - The inner type for the error (see Error from lib/error)
 *
 * The func parameter should run all of the queries to take advantage of this functions convenience mechanisms.
 * It takes two parameters:
 * 1. sql; The sql object to run the queries on. Use this instead of the outer sql (the parameter of transact).
 * 2. abort; The abort handler. In order to abort the transaction and rollback all changes, without throwing an error.
 *     The user (func) can call this function to abort the transaction but still return a value (instead of crashing).
 *     All execution of func ends immediately when abort is called.
 *     This function must not be called instead a try block, as it uses an exception internally.
 *
 * @param sql The sql object to perform the queries with.
 * @param func The function that should run all the queries and return the appropriate result.
 * @return The return of the inner function func.
 */
export async function transact<TResult, EInner = any, EContext = any>(
    sql: postgres.Sql, errorTemplate: Error<any, EContext>,
    func: (
        sql: postgres.TransactionSql,
        abort: (ret: TResult) => void
    ) => TResult | Promise<TResult>,
): Promise<TResult> {
    const p = new Promise((R: (v: TResult) => void, F: (e: Error<EInner, EContext> | aborter<TResult>) => void) => {
        const abort = (v: TResult) => {
            throw {returnValue: v, [ABORT_SIGNAL]: true};
        };

        beginOrContinue<TResult>(sql, (sql) => func(sql, abort))
            .then(v => R(v as TResult))
            .catch(e => {
                if (typeof e === "object" && ABORT_SIGNAL in e) {
                    R(e.returnValue as TResult);
                } else {
                    errorTemplate.cause = e;
                    F(errorTemplate);
                }
            });
    });
    return p;
}
