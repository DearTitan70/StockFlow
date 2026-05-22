const crypto = require('crypto');

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'Administrador StockFlow',
        email: 'admin@stockflow.local',
        role: 'jefe',
        active: true,
        createdAt: new Date().toISOString(),
    },
];

const products = [
    {
        id: 1,
        sku: 'LAP-DELL-001',
        name: 'Laptop Dell',
        category: 'Computadores',
        quantity: 8,
        minStock: 2,
        status: 'activo',
        location: 'Bodega principal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        sku: 'MOU-LOG-001',
        name: 'Mouse Logitech',
        category: 'Perifericos',
        quantity: 1,
        minStock: 3,
        status: 'en_reparacion',
        location: 'Soporte tecnico',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const movements = [];
const sessions = [];

const nextId = (collection) => {
    if (collection.length === 0) {
        return 1;
    }

    return Math.max(...collection.map((item) => item.id)) + 1;
};

const createToken = (userId) => {
    const token = crypto.randomBytes(24).toString('hex');
    sessions.push({
        token,
        userId,
        createdAt: new Date().toISOString(),
    });
    return token;
};

module.exports = {
    users,
    products,
    movements,
    sessions,
    nextId,
    createToken,
};
