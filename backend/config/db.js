// Configuración de conexión a PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();

// Crear pool de conexión
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exportar conexión
module.exports = pool;