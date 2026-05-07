import { createContext, useState } from "react";

export const AuthContext = createContext();

// Proveedor global de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simulación de login
    const login = (username, role) => {
        setUser({ username, role });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};