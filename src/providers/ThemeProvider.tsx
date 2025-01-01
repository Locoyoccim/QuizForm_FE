import { createContext, useState, useEffect } from "react";
import { childrenContext, ThemeContextProps } from "../interfaces/indexInterface";
import useSystemDarkMode from "../hooks/useSystemDarkMode";

export const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: childrenContext) {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const systemDarkMode = useSystemDarkMode();

    useEffect(() => {
        if (darkMode === false) {
            setDarkMode(systemDarkMode);
        }
    }, [systemDarkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
