import type { IAgent } from "../../../../../domain/entities/agents/agent.entity"

type AgentCardComponentProps = {
    agent: IAgent
}

export default function AgentCardComponent({
    agent
}: AgentCardComponentProps) {
    return (<div>{agent.displayName}</div>)
}