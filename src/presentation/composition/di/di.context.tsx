import { createContext } from "react";
import { GetAllUsersUseCase } from "../../../domain/usecases/get-all-users.usecase";
import type { GetAgentByIdUseCase } from "../../../domain/usecases/get-agent-by-id.usecase";
import type { GetAllAgentsUseCase } from "../../../domain/usecases/get-all-agents.usecase";

type DiContextType = {
    getAllUsersUseCase: GetAllUsersUseCase;
    getAllAgentsUseCase: GetAllAgentsUseCase;
    getAgentByIdUseCase: GetAgentByIdUseCase;
}

export const DiContext = createContext<DiContextType | null>(null)


