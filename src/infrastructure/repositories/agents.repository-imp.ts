import type { AgentsRepository } from "../../domain/repositories/agents.repository";
import type { AgentsDatasource } from "../datasources/agents.datasource";

export class AgentsRepositoryImp implements AgentsRepository {
    private datasource: AgentsDatasource;

    constructor(datasource: AgentsDatasource) {
        this.datasource = datasource;
    }
    
    async getAllAgents() {
        return this.datasource.getAllAgents();
    }

    async getAgentById(id: string) {
        return this.datasource.getAgentById(id);
    }
}