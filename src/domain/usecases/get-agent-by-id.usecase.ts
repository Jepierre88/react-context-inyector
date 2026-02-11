import type { AgentsRepository } from "../repositories/agents.repository";

export class GetAgentByIdUseCase {
    private readonly agentsRepository: AgentsRepository;

    constructor(agentsRepository: AgentsRepository) {
        this.agentsRepository = agentsRepository;
    }   

    async execute(agentId: string) {
        return this.agentsRepository.getAgentById(agentId);
    }
}