const db = {
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
};

const GlobalConfig = {
    db: db,
    dev: process.env.NODE_ENV === 'development',
};

export default GlobalConfig;
