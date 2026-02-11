import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"
import AgentCardComponent from "../components/agent-card.component"

type HomeDumpComponentProps = {
    agents: IAgent[]
}

export default function HomeDumpComponent({
    agents
}:HomeDumpComponentProps) {


    return (
        <>
        holamundo
            {agents.map(agent => <AgentCardComponent key={agent.uuid} agent={agent}/>)}
        </>
    )
}