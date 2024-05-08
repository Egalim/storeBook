import postgres from "postgres"

export const sql = postgres({
    host: 'localhost',
    port: 5432,
    db: 'storeFILM',
    username: 'postgres',
    password: 'root'
})