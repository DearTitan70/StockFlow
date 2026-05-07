// Importación de dependencias
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Configuración de variables de entorno
dotenv.config();

// Inicialización de la app
const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});