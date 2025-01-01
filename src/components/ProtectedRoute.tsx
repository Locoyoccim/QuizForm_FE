import { ComponentType, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function ProtectedRoute({ element: Element }: { element: ComponentType }) {
    const context = useContext(AuthContext);
    return !context.isAuthenticated ? <Navigate to="/" /> : <Element />;
}

export default ProtectedRoute;
