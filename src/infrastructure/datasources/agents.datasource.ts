import type { IGetAgentByIdResponse } from "../../domain/entities/agents/response/get-agent-by-id-response.entity";
import type { IGetAllAgentsResponse } from "../../domain/entities/agents/response/get-all-agents-response.entity";
import type { AgentsRepository } from "../../domain/repositories/agents.repository";
import { BaseHttpService } from "./base-http-service.datasource";

export class AgentsDatasource extends BaseHttpService implements AgentsRepository {
    protected readonly baseUrl = "https://valorant-api.com/v1/agents";

    async getAllAgents() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.get<IGetAllAgentsResponse>("");
    }

    async getAgentById(id: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.get<IGetAgentByIdResponse>(`/${id}`);
    }
    
}