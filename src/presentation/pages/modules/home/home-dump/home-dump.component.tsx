import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import { useCallback, useMemo, useState } from "react"
import AgentListComponent from "../components/agent-list.component"
import { ThemeSwitcher } from "@/shared/components/theme-switcher.component"
import AgentDialogComponent from "../components/agent-dialog.component"
import { Input } from "@/shared/components/ui/input"
import { Search } from "lucide-react"

type HomeDumpComponentProps = {
    agents: IAgent[],
    selectedAgent: IAgent | null,
    handleSelectAgent: (agent: IAgent) => void,
}

export default function HomeDumpComponent({
    agents,
    handleSelectAgent,
    selectedAgent,
}: HomeDumpComponentProps) {

    const playableAgents = agents.filter(agent => agent.isPlayableCharacter)

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedRole, setSelectedRole] = useState<string | null>(null)

    const roles = useMemo(() => {
        const roleSet = new Map<string, { displayName: string; displayIcon: string }>()
        playableAgents.forEach(agent => {
            if (agent.role && !roleSet.has(agent.role.uuid)) {
                roleSet.set(agent.role.uuid, {
                    displayName: agent.role.displayName,
                    displayIcon: agent.role.displayIcon,
                })
            }
        })
        return Array.from(roleSet.entries())
    }, [playableAgents])

    const filteredAgents = useMemo(() => {
        return playableAgents.filter(agent => {
            const matchesSearch = agent.displayName.toLowerCase().includes(search.toLowerCase())
            const matchesRole = !selectedRole || agent.role?.uuid === selectedRole
            return matchesSearch && matchesRole
        })
    }, [playableAgents, search, selectedRole])

    const handleViewDetail = useCallback((agent: IAgent) => {
        handleSelectAgent(agent)
        setIsDialogOpen(true)
    }, [handleSelectAgent])

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false)
    }, [])

    return (
        <main className="min-h-dvh p-4 sm:p-8">
            <ThemeSwitcher/>
            <div className="max-w-7xl mx-auto">
                {/* Header futurista */}
                <div className="mb-8">
                    <h1 className="font-bebas text-6xl sm:text-7xl tracking-widest uppercase text-foreground">
                        Valorant
                        <span className="block text-3xl sm:text-4xl tracking-[0.3em] text-muted-foreground">
                            Agents Database
                        </span>
                    </h1>
                </div>

                {/* Barra de filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar agente..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 font-bebas tracking-wider text-lg h-11 border-border/50 focus:border-foreground/30"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedRole(null)}
                            className={`font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md border transition-all ${
                                !selectedRole
                                    ? "bg-foreground text-background border-foreground"
                                    : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                            }`}
                        >
                            Todos
                        </button>
                        {roles.map(([uuid, role]) => (
                            <button
                                key={uuid}
                                onClick={() => setSelectedRole(selectedRole === uuid ? null : uuid)}
                                className={`flex items-center gap-2 font-bebas text-sm tracking-wider uppercase px-4 py-2 rounded-md border transition-all ${
                                    selectedRole === uuid
                                        ? "bg-foreground text-background border-foreground"
                                        : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                }`}
                                title={role.displayName}
                            >
                                <img
                                    src={role.displayIcon}
                                    alt={role.displayName}
                                    className={`w-4 h-4 ${selectedRole === uuid ? "dark:invert invert-0" : "dark:invert-0 invert opacity-70"}`}
                                />
                                <span className="hidden sm:inline">{role.displayName}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contador dinámico */}
                <p className="font-mono text-xs text-muted-foreground mb-4 tracking-wider">
                    // mostrando <span className="text-foreground font-semibold">{filteredAgents.length}</span> de {playableAgents.length} agentes
                    {selectedRole && " • filtrado por rol"}
                    {search && ` • buscando "${search}"`}
                </p>

                <div className="rounded-xl border border-border/50 overflow-hidden shadow-2xl">
                    <AgentListComponent
                        playableAgents={filteredAgents}
                        onViewDetail={handleViewDetail}
                    />
                </div>
            </div>
            <AgentDialogComponent agent={selectedAgent} 
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
            />
        </main>
    )
}

