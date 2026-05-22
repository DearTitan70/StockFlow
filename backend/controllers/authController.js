const { users, nextId, createToken } = require('../data/store');
const { badRequest, created, ok } = require('../utils/response');

const publicUser = (user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
});

exports.register = async (req, res) => {
    const { username, password, name, email, role = 'tecnico' } = req.body;
    const validRoles = ['jefe', 'supervisor', 'tecnico'];
    const errors = [];

    if (!username) errors.push('El nombre de usuario es obligatorio');
    if (!password || password.length < 6) errors.push('La contrasena debe tener minimo 6 caracteres');
    if (!name) errors.push('El nombre completo es obligatorio');
    if (!email || !email.includes('@')) errors.push('El correo electronico es obligatorio y debe ser valido');
    if (!validRoles.includes(role)) errors.push('El rol debe ser jefe, supervisor o tecnico');

    if (errors.length > 0) {
        return badRequest(res, 'Datos de registro invalidos', errors);
    }

    const userExists = users.find((user) => user.username === username || user.email === email);
    if (userExists) {
        return badRequest(res, 'El usuario o correo ya existe');
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

    return created(res, {
        message: 'Usuario registrado correctamente',
        user: publicUser(user),
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return badRequest(res, 'Usuario y contrasena son obligatorios');
    }

    const user = users.find((item) => item.username === username && item.active);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Error en la autenticacion' });
    }

    return ok(res, {
        message: 'Autenticacion satisfactoria',
        token: createToken(user.id),
        user: publicUser(user),
    });
};

exports.me = async (req, res) => {
    return ok(res, { user: publicUser(req.user) });
};
