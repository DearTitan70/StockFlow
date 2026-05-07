import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Bienvenido, {user.username}</h1>
            <p>Rol: {user.role}</p>

            {/* Vista diferente según rol */}
            {user.role === "jefe" && <p>Panel estratégico con métricas</p>}
            {user.role === "supervisor" && <p>Vista de monitoreo</p>}
            {user.role === "tecnico" && <p>Gestión rápida de inventario</p>}
        </div>
    );
};

export default Dashboard;