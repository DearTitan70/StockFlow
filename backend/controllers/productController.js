const { products, movements, nextId } = require('../data/store');
const { ok, created, badRequest, notFound } = require('../utils/response');

const validStatus = ['activo', 'en_reparacion', 'de_baja'];

const validateProduct = ({ sku, name, category, quantity, minStock, status }) => {
    const errors = [];

    if (!sku) errors.push('El SKU es obligatorio');
    if (!name) errors.push('El nombre del producto es obligatorio');
    if (!category) errors.push('La categoria es obligatoria');
    if (!Number.isInteger(quantity) || quantity < 0) errors.push('La cantidad debe ser un numero entero mayor o igual a cero');
    if (!Number.isInteger(minStock) || minStock < 0) errors.push('El stock minimo debe ser un numero entero mayor o igual a cero');
    if (status && !validStatus.includes(status)) errors.push('El estado no es valido');

    return errors;
};

exports.list = (req, res) => {
    const { status, category, search } = req.query;
    let result = products;

    if (status) {
        result = result.filter((product) => product.status === status);
    }

    if (category) {
        result = result.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
        const term = search.toLowerCase();
        result = result.filter((product) => product.name.toLowerCase().includes(term) || product.sku.toLowerCase().includes(term));
    }

    return ok(res, result);
};

exports.getById = (req, res) => {
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
        return notFound(res, 'Producto no encontrado');
    }

    return ok(res, product);
};

exports.create = (req, res) => {
    const productData = {
        sku: req.body.sku,
        name: req.body.name,
        category: req.body.category,
        quantity: Number(req.body.quantity),
        minStock: Number(req.body.minStock ?? 0),
        status: req.body.status || 'activo',
        location: req.body.location || 'Bodega principal',
    };
    const errors = validateProduct(productData);

    if (errors.length > 0) {
        return badRequest(res, 'Datos de producto invalidos', errors);
    }

    const exists = products.find((product) => product.sku === productData.sku);
    if (exists) {
        return badRequest(res, 'Ya existe un producto con ese SKU');
    }

    const now = new Date().toISOString();
    const product = {
        id: nextId(products),
        ...productData,
        createdAt: now,
        updatedAt: now,
    };

    products.push(product);
    return created(res, product);
};

exports.update = (req, res) => {
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
        return notFound(res, 'Producto no encontrado');
    }

    const nextProduct = {
        ...product,
        sku: req.body.sku ?? product.sku,
        name: req.body.name ?? product.name,
        category: req.body.category ?? product.category,
        quantity: req.body.quantity !== undefined ? Number(req.body.quantity) : product.quantity,
        minStock: req.body.minStock !== undefined ? Number(req.body.minStock) : product.minStock,
        status: req.body.status ?? product.status,
        location: req.body.location ?? product.location,
    };
    const errors = validateProduct(nextProduct);

    if (errors.length > 0) {
        return badRequest(res, 'Datos de producto invalidos', errors);
    }

    Object.assign(product, nextProduct, { updatedAt: new Date().toISOString() });
    return ok(res, product);
};

exports.updateStatus = (req, res) => {
    const product = products.find((item) => item.id === Number(req.params.id));
    const { status } = req.body;

    if (!product) {
        return notFound(res, 'Producto no encontrado');
    }

    if (!validStatus.includes(status)) {
        return badRequest(res, 'El estado debe ser activo, en_reparacion o de_baja');
    }

    product.status = status;
    product.updatedAt = new Date().toISOString();

    return ok(res, product);
};

exports.remove = (req, res) => {
    const index = products.findIndex((item) => item.id === Number(req.params.id));

    if (index === -1) {
        return notFound(res, 'Producto no encontrado');
    }

    const [product] = products.splice(index, 1);
    movements.push({
        id: nextId(movements),
        productId: product.id,
        type: 'eliminacion',
        quantity: product.quantity,
        reason: 'Producto eliminado del inventario',
        userId: req.user.id,
        createdAt: new Date().toISOString(),
    });

    return ok(res, { message: 'Producto eliminado correctamente', product });
};
