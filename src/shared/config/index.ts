import normalizePort from "normalize-port-2";

const config = Object.freeze({
    DB_HOST: process.env.DB_HOST,
    DB_PORT: normalizePort(process.env.DB_PORT),
    DB_NAME: process.env.DB_NAME,
})

export default config;