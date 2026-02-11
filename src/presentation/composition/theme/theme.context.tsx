import { createContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "app-theme"

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(STORAGE_KEY) as Theme) || "system"
    )

    useEffect(() => {
        const root = document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }

        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
