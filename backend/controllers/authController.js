// Simulación de base de datos en memoria
const users = [];

// Registro
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Campos obligatorios' });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }

    users.push({ username, password });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Campos obligatorios' });
    }

    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Error en la autenticación' });
    }

    res.json({ message: 'Autenticación satisfactoria' });
};