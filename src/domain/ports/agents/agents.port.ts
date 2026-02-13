import type { IGetAgentByIdResponse } from "../../entities/agents/response/get-agent-by-id-response.entity";
import type { IGetAllAgentsResponse } from "../../entities/agents/response/get-all-agents-response.entity";

export abstract class AgentsPort {
    abstract getAllAgents(): Promise<IGetAllAgentsResponse>;
    abstract getAgentById(agentId: string): Promise<IGetAgentByIdResponse>;
}
