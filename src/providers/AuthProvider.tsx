import { createContext } from "react";
import useToken from "../hooks/useToken";
import { childrenContext } from "../interfaces/indexInterface";
import { useState } from "react";
import { AuthContextProps } from "./TypesAuthProvider";

const defaultAuthContext: AuthContextProps = {
    isAuthenticated: false,
    Login: () => {},
    Logout: () => {},
    GetToken: () => "",
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

function AuthProvider({ children }: childrenContext) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { getToken, setToken, removeToken } = useToken();

    const GetToken = () => getToken() || "";

    const Login = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    const Logout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, Login, Logout, GetToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
