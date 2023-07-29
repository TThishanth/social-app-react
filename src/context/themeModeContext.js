import { createContext, useEffect, useState } from "react";

export const ThemeModeContext = createContext();

export const ThemeModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    const toggle = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <ThemeModeContext.Provider value={{ darkMode, toggle }}>
            {children}
        </ThemeModeContext.Provider>
    );
};