const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const movementRoutes = require('./routes/movementRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.get('/', (req, res) => {
    res.json({
        name: 'StockFlow API',
        version: '1.0.0',
        status: 'online',
        documentation: '/api/docs',
    });
});

app.get('/api/docs', (req, res) => {
    res.json({
        message: 'Documentacion de servicios web StockFlow',
        endpoints: {
            auth: ['/api/auth/register', '/api/auth/login', '/api/auth/me'],
            users: ['/api/users', '/api/users/:id'],
            products: ['/api/products', '/api/products/:id', '/api/products/:id/status'],
            movements: ['/api/movements'],
            reports: ['/api/reports/summary', '/api/reports/low-stock'],
        },
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/reports', reportRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Servicio no encontrado' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
