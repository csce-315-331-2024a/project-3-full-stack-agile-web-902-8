const db = {
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
};

const rates = {
    discount: 0.1,
    tax: 0.0825, // College Station sales tax rate
};

export enum loginLevels {
    LOGIN_FAILED = 'FAILED',
    LOGIN_ADMINISTRATOR = 'ADMINISTRATOR',
    LOGIN_MANAGER = 'MANAGER',
    LOGIN_CASHIER = 'CASHIER',
    LOGIN_COOK = 'COOK',
    LOGIN_CUSTOMER = 'CUSTOMER',
}

const GlobalConfig = {
    db: db,
    dev: process.env.NODE_ENV === 'development',
    rates: rates,
    loginLevels: loginLevels,
};

export default GlobalConfig;
