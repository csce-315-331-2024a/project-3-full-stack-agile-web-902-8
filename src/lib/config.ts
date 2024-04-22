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

const openweather = {
    key: process.env.WEATHER_KEY
};

const GlobalConfig = {
    db: db,
    dev: process.env.NODE_ENV === 'development',
    rates: rates,
    weather: openweather,
};

export default GlobalConfig;
