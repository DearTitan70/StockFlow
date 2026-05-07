import { useState } from "react";

// Datos simulados
const Inventario = () => {
    const [items, setItems] = useState([
        { id: 1, nombre: "Laptop Dell", estado: "Activo" },
        { id: 2, nombre: "Mouse Logitech", estado: "En reparación" },
    ]);

    const agregarItem = () => {
        const nuevo = {
            id: items.length + 1,
            nombre: "Nuevo Equipo",
            estado: "Activo",
        };
        setItems([...items, nuevo]);
    };

    return (
        <div>
            <h2>Inventario</h2>

            <button onClick={agregarItem}>Agregar</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventario;