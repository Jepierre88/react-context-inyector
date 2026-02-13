import { useMemo, type PropsWithChildren } from "react";
import { AgentsDiContext } from "./agents.context";
import { AgentsDatasource } from "@/infrastructure/datasources/agents.datasource";
import { AgentsRepositoryImp } from "@/infrastructure/repositories/agents.repository-imp";
import { GetAllAgentsUseCase } from "@/domain/usecases/get-all-agents.usecase";
import { GetAgentByIdUseCase } from "@/domain/usecases/get-agent-by-id.usecase";

export const AgentsDiProvider = ({ children }: PropsWithChildren) => {
  const agentsDatasource = useMemo(() => new AgentsDatasource(), []);
  const agentsRepositoryImp = useMemo(
    () => new AgentsRepositoryImp(agentsDatasource),
    [agentsDatasource]
  );

  const getAllAgentsUseCase = useMemo(
    () => new GetAllAgentsUseCase(agentsRepositoryImp),
    [agentsRepositoryImp]
  );

  const getAgentByIdUseCase = useMemo(
    () => new GetAgentByIdUseCase(agentsRepositoryImp),
    [agentsRepositoryImp]
  );

  const value = useMemo(
    () => ({ getAllAgentsUseCase, getAgentByIdUseCase }),
    [getAllAgentsUseCase, getAgentByIdUseCase]
  );

  return (
    <AgentsDiContext.Provider value={value}>
      {children}
    </AgentsDiContext.Provider>
  );
};
