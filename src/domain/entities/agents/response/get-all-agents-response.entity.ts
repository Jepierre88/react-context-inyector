import type { IGeneralResponse } from "../../../../shared/interfaces/general-response.interface";
import type { IAgent } from "../agent.entity";

export type IGetAllAgentsResponse = IGeneralResponse<IAgent[]>