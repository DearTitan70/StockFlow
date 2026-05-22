const ok = (res, data, status = 200) => res.status(status).json(data);

const created = (res, data) => ok(res, data, 201);

const badRequest = (res, message, errors = []) => res.status(400).json({ message, errors });

const notFound = (res, message = 'Recurso no encontrado') => res.status(404).json({ message });

module.exports = {
    ok,
    created,
    badRequest,
    notFound,
};
