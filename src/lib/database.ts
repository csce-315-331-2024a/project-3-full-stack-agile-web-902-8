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
