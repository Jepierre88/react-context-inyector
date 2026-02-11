import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../../presentation/composition/theme/use-theme"
import { Button } from "./ui/button"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
        setTheme(nextTheme)
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} title={`Tema: ${theme}`}>
            {theme === "light" && <Sun className="h-4 w-4" />}
            {theme === "dark" && <Moon className="h-4 w-4" />}
            {theme === "system" && <Monitor className="h-4 w-4" />}
        </Button>
    )
}
