import { useMemo, type PropsWithChildren } from "react";
import { GetAllUsersUseCase } from "../../../domain/usecases/get-all-users.usecase";
import { UserDatasource } from "../../../infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "../../../infrastructure/repositories/user.repository-imp";
import { DiContext } from "./di.context";
import { AgentsDatasource } from "../../../infrastructure/datasources/agents.datasource";
import { AgentsRepositoryImp } from "../../../infrastructure/repositories/agents.repository-imp";
import { GetAllAgentsUseCase } from "../../../domain/usecases/get-all-agents.usecase";
import { GetAgentByIdUseCase } from "../../../domain/usecases/get-agent-by-id.usecase";

export const DiContextProvider = ({children}:PropsWithChildren)=>{


    //USERS
    const userDatasource = useMemo(() => new UserDatasource(), []);
    const userRepositoryImp = useMemo(() => new UserRepositoryImp(userDatasource), [userDatasource]);
    const getAllUsersUseCase = useMemo(() => new GetAllUsersUseCase(userRepositoryImp), [userRepositoryImp]);


    //AGENTS
    const agentsDatasource = useMemo(() => new AgentsDatasource(), []);
    const agentsRepositoryImp = useMemo(() => new AgentsRepositoryImp(agentsDatasource), [agentsDatasource]);
    const getAllAgentsUseCase = useMemo(() => new GetAllAgentsUseCase(agentsRepositoryImp), [agentsRepositoryImp]);
    const getAgentByIdUseCase = useMemo(() => new GetAgentByIdUseCase(agentsRepositoryImp), [agentsRepositoryImp]);

    const deps = useMemo(() => ({
        getAllUsersUseCase,
        getAllAgentsUseCase,
        getAgentByIdUseCase
    }), [getAllUsersUseCase, getAllAgentsUseCase, getAgentByIdUseCase]);

    return <DiContext.Provider value={deps}>
        {children}
    </DiContext.Provider>
};
