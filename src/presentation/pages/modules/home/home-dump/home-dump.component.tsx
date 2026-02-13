import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import { useCallback, useMemo, useState } from "react"
import AgentListComponent from "../components/agent-list.component"
import AgentDialogComponent from "../components/agent-dialog.component"
import AgentFiltersComponent from "../components/agent-filters.component"
import ListHeaderComponent from "../components/list-header.component"

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
            <div className="max-w-7xl mx-auto">
                <ListHeaderComponent />
                <AgentFiltersComponent
                    roles={roles}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    search={search}
                    setSearch={setSearch}
                    filteredAgentsCount={filteredAgents.length}
                    totalAgentsCount={playableAgents.length}
                />

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

