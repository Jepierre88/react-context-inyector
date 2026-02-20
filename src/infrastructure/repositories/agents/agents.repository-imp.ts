import type { AgentsPort } from "../../../domain/ports/agents/agents.port";
import type { AgentsDatasource } from "../../datasources/agents/agents.datasource";

export class AgentsRepositoryImp implements AgentsPort {
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
