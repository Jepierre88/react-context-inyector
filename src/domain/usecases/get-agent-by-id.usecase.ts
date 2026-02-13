import type { AgentsPort } from "../ports/agents/agents.port";

export class GetAgentByIdUseCase {
    private readonly agentsPort: AgentsPort;

    constructor(agentsPort: AgentsPort) {
        this.agentsPort = agentsPort;
    }   

    async execute(agentId: string) {
        return this.agentsPort.getAgentById(agentId);
    }
}