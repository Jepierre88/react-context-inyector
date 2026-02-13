import { Link, useLocation } from "react-router-dom"
import { ThemeSwitcher } from "@/shared/components/theme-switcher.component"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { GraduationCap, Home, Repeat } from "lucide-react"
import { cn } from "@/shared/lib/utils"

type NavRoute = {
    path: string
    label: string
    description: string
    icon: React.ReactNode
}

const NAV_ROUTES: NavRoute[] = [
    {
        path: "/",
        label: "Home",
        description: "Context + DI",
        icon: <Home className="size-4" />,
    },
    {
        path: "/strategy",
        label: "Strategy",
        description: "Patrón Strategy",
        icon: <Repeat className="size-4" />,
    },
]

export default function NavHeader() {
    const location = useLocation()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
                {/* Logo / Brand */}
                <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <GraduationCap className="size-4" />
                    </div>
                    <span className="hidden sm:inline text-sm">
                        Arquitectura
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-1">
                    {NAV_ROUTES.map((route) => {
                        const isActive = location.pathname === route.path

                        return (
                            <Button
                                key={route.path}
                                variant={isActive ? "secondary" : "ghost"}
                                size="sm"
                                asChild
                                className={cn(
                                    "gap-1.5 transition-all",
                                    isActive && "shadow-sm"
                                )}
                            >
                                <Link to={route.path}>
                                    {route.icon}
                                    <span className="hidden sm:inline">{route.label}</span>
                                    <span className="inline sm:hidden text-xs">{route.label}</span>
                                </Link>
                            </Button>
                        )
                    })}
                </nav>

                {/* Right section */}
                <div className="flex items-center gap-2">
                    <Separator orientation="vertical" className="mx-1 h-5 hidden sm:block" />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    )
}
