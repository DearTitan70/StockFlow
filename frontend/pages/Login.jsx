import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("tecnico");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, role);
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <h2>Ingreso al Sistema</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="jefe">Jefe</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="tecnico">Técnico</option>
                </select>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;