import type { IAgent } from "@/domain/entities/agents/agent.entity";
import useAgents from "../../../../hooks/use-agents";
import HomeDumpComponent from "../home-dump/home-dump.component";
import { useCallback, useState } from "react";

export default function HomeSmartComponent() {

    const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null)

    const {
        agents,
        getAgentById,
    } = useAgents({
        getAllLoadingIds: ["agentsList"],
        getByIdLoadingIds: ["agentDetail"]
    })

    const selectAgent = useCallback(async (agent: IAgent) => {
        const agentDetail = await getAgentById(agent.uuid).catch(err => {
            console.error("Error fetching agent detail:", err)
            return null
        })
        if (agentDetail) {
            setSelectedAgent(agentDetail)
        }
    }, [getAgentById])

    return (
        <HomeDumpComponent agents={agents} selectedAgent={selectedAgent} handleSelectAgent={selectAgent} />
    )
}