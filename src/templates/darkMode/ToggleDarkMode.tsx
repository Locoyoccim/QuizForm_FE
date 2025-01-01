import { useContext } from "react";
import "./darkMode.css";
import { ThemeContext } from "../../providers/ThemeProvider";

function ToggleDarkMode() {
    const context = useContext(ThemeContext);

    const handleChange = () => {
        context?.setDarkMode((prevState) => !prevState);
    };

    return (
        <input
            type="checkbox"
            id="toggle"
            checked={context?.darkMode}
            onChange={handleChange}
        />
    );
}

export default ToggleDarkMode;
