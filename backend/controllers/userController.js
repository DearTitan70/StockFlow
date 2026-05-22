const { users, nextId } = require('../data/store');
const { ok, created, badRequest, notFound } = require('../utils/response');

const validRoles = ['jefe', 'supervisor', 'tecnico'];

const publicUser = (user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
});

exports.list = (req, res) => {
    return ok(res, users.map(publicUser));
};

exports.create = (req, res) => {
    const { username, password, name, email, role = 'tecnico' } = req.body;
    const errors = [];

    if (!username) errors.push('El usuario es obligatorio');
    if (!password || password.length < 6) errors.push('La contrasena debe tener minimo 6 caracteres');
    if (!name) errors.push('El nombre es obligatorio');
    if (!email || !email.includes('@')) errors.push('El correo debe ser valido');
    if (!validRoles.includes(role)) errors.push('El rol no es valido');

    if (errors.length > 0) {
        return badRequest(res, 'Datos de usuario invalidos', errors);
    }

    const exists = users.find((user) => user.username === username || user.email === email);
    if (exists) {
        return badRequest(res, 'El usuario o correo ya se encuentra registrado');
    }

    const user = {
        id: nextId(users),
        username,
        password,
        name,
        email,
        role,
        active: true,
        createdAt: new Date().toISOString(),
    };

    users.push(user);
    return created(res, publicUser(user));
};

exports.update = (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
        return notFound(res, 'Usuario no encontrado');
    }

    const { name, email, role, active } = req.body;

    if (role && !validRoles.includes(role)) {
        return badRequest(res, 'El rol no es valido');
    }

    if (email && !email.includes('@')) {
        return badRequest(res, 'El correo debe ser valido');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.active = typeof active === 'boolean' ? active : user.active;

    return ok(res, publicUser(user));
};

exports.remove = (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
        return notFound(res, 'Usuario no encontrado');
    }

    user.active = false;
    return ok(res, { message: 'Usuario desactivado correctamente', user: publicUser(user) });
};
