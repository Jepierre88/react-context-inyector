import type { AgentsPort } from "../ports/agents/agents.port";

export class GetAllAgentsUseCase {
    private readonly agentsPort: AgentsPort;

    constructor(agentsPort: AgentsPort) {
        this.agentsPort = agentsPort;
    }
    
    async execute() {
        return this.agentsPort.getAllAgents();
    }
}