import type { IAgent } from "@/domain/entities/agents/agent.entity";
import useAgents from "../../../../hooks/use-agents";
import HomeDumpComponent from "../home-dump/home-dump.component";
import { useCallback, useState } from "react";
import { useLoading } from "@/presentation/composition/loading/use-loading";
export default function HomeSmartComponent() {

    const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null)

    const {
        setLoading
    } = useLoading()

    const {
        agents,
        getAgentById
    } = useAgents()

    const selectAgent = useCallback(async (agent: IAgent) => {
        setLoading("agentDetail", true)
        const agentDetail = await getAgentById(agent.uuid).catch(err => {
            console.error("Error fetching agent detail:", err)
            return null
        })
        setLoading("agentDetail", false)
        if (agentDetail) {
            setSelectedAgent(agentDetail)
        }
    }, [getAgentById, setLoading])

    return (
        <HomeDumpComponent agents={agents} selectedAgent={selectedAgent} handleSelectAgent={selectAgent} />
    )
}