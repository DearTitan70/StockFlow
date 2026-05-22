const { products, movements, nextId } = require('../data/store');
const { ok, created, badRequest } = require('../utils/response');

const validTypes = ['entrada', 'salida', 'ajuste'];

exports.list = (req, res) => {
    return ok(res, movements);
};

exports.create = (req, res) => {
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const { type, reason = 'Movimiento de inventario' } = req.body;
    const product = products.find((item) => item.id === productId);
    const errors = [];

    if (!product) errors.push('El producto indicado no existe');
    if (!validTypes.includes(type)) errors.push('El tipo debe ser entrada, salida o ajuste');
    if (!Number.isInteger(quantity) || quantity <= 0) errors.push('La cantidad debe ser un entero mayor que cero');

    if (errors.length > 0) {
        return badRequest(res, 'Datos de movimiento invalidos', errors);
    }

    if (type === 'salida' && product.quantity < quantity) {
        return badRequest(res, 'No hay stock suficiente para registrar la salida');
    }

    if (type === 'entrada') {
        product.quantity += quantity;
    }

    if (type === 'salida') {
        product.quantity -= quantity;
    }

    if (type === 'ajuste') {
        product.quantity = quantity;
    }

    product.updatedAt = new Date().toISOString();

    const movement = {
        id: nextId(movements),
        productId,
        productName: product.name,
        type,
        quantity,
        reason,
        userId: req.user.id,
        createdAt: new Date().toISOString(),
    };

    movements.push(movement);
    return created(res, movement);
};
