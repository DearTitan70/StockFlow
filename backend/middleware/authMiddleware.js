const { sessions, users } = require('../data/store');

const authenticate = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    const session = sessions.find((item) => item.token === token);

    if (!session) {
        return res.status(401).json({ message: 'Token de autenticacion requerido o invalido' });
    }

    const user = users.find((item) => item.id === session.userId && item.active);

    if (!user) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    req.user = user;
    next();
};

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'No tiene permisos para ejecutar esta accion' });
    }

    next();
};

module.exports = {
    authenticate,
    authorize,
};
