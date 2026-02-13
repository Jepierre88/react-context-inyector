import type { GetAllUsersUseCase } from "@/domain/usecases/get-all-users.usecase";
import { createContext } from "react";

export type UsersDiContextValue = {
  getAllUsersUseCase: GetAllUsersUseCase;
};


export const UserDiContext = createContext<UsersDiContextValue | undefined>(undefined);