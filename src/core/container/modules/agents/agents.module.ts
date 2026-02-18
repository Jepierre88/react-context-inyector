import { asClass, asFunction } from "awilix";
import { AgentsDatasource } from "@/infrastructure/datasources/agents.datasource";
import { AgentsRepositoryImp } from "@/infrastructure/repositories/agents.repository-imp";
import { GetAllAgentsUseCase } from "@/domain/usecases/get-all-agents.usecase";
import { GetAgentByIdUseCase } from "@/domain/usecases/get-agent-by-id.usecase";
import type { DIContainerCradle } from "../../container";

export const agentsModule = {
  agentsDatasource: asClass(AgentsDatasource).singleton(),
  agentsRepository: asFunction(
    ({ agentsDatasource }: DIContainerCradle) =>
      new AgentsRepositoryImp(agentsDatasource)
  ).singleton(),
  getAllAgentsUseCase: asFunction(
    ({ agentsRepository }: DIContainerCradle) =>
      new GetAllAgentsUseCase(agentsRepository)
  ).singleton(),
  getAgentByIdUseCase: asFunction(
    ({ agentsRepository }: DIContainerCradle) =>
      new GetAgentByIdUseCase(agentsRepository)
  ).singleton(),
};
