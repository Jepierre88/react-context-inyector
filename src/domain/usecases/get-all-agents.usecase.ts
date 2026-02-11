import type { AgentsRepository } from "../repositories/agents.repository";

export class GetAllAgentsUseCase {
    private readonly agentsRepository: AgentsRepository;

    constructor(agentsRepository: AgentsRepository) {
        this.agentsRepository = agentsRepository;
    }
    
    async execute() {
        return this.agentsRepository.getAllAgents();
    }
}