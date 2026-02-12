import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import { useCallback, useState } from "react"
import AgentListComponent from "../components/agent-list.component"
import { ThemeSwitcher } from "@/shared/components/theme-switcher.component"
import AgentDialogComponent from "../components/agent-dialog.component"

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

    const handleViewDetail = useCallback((agent: IAgent) => {
        handleSelectAgent(agent)
        setIsDialogOpen(true)
    }, [handleSelectAgent])

    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false)
    }, [])

    return (
        <main className="min-h-dvh p-8">
            <ThemeSwitcher/>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">
                    Valorant Agents
                </h1>
                <p className="mb-8">
                    {playableAgents.length} agentes disponibles
                </p>

                <div className="rounded-xl border overflow-hidden shadow-2xl">
                    <AgentListComponent
                        playableAgents={playableAgents}
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

