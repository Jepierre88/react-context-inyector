import { createContext } from "react";
import type { GetAllAgentsUseCase } from "@/domain/usecases/get-all-agents.usecase";
import type { GetAgentByIdUseCase } from "@/domain/usecases/get-agent-by-id.usecase";

export type AgentsDiContextValue = {
  getAllAgentsUseCase: GetAllAgentsUseCase;
  getAgentByIdUseCase: GetAgentByIdUseCase;
};

export const AgentsDiContext = createContext<AgentsDiContextValue | undefined>(
  undefined
);
