const { products, movements, users } = require('../data/store');
const { ok } = require('../utils/response');

exports.summary = (req, res) => {
    const totalProducts = products.length;
    const totalUnits = products.reduce((sum, product) => sum + product.quantity, 0);
    const lowStock = products.filter((product) => product.quantity <= product.minStock);
    const byStatus = products.reduce((acc, product) => {
        acc[product.status] = (acc[product.status] || 0) + 1;
        return acc;
    }, {});

    return ok(res, {
        totalProducts,
        totalUnits,
        lowStockCount: lowStock.length,
        activeUsers: users.filter((user) => user.active).length,
        movementsCount: movements.length,
        byStatus,
        generatedAt: new Date().toISOString(),
    });
};

exports.lowStock = (req, res) => {
    return ok(res, products.filter((product) => product.quantity <= product.minStock));
};
