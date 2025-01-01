import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useContext } from "react";
import { ThemeContext } from "./providers/ThemeProvider";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
    const context = useContext(ThemeContext);

    return (
        <div
            data-bs-theme={context?.darkMode ? "dark" : "light"}
            style={{ minHeight: "100vh" }}
            className={`${
                context?.darkMode ? "bg-dark text-light" : "bg-light text-dark"
            }`}
        >
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
