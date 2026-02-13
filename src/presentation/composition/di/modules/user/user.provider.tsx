import { useMemo, type PropsWithChildren } from "react";
import { GetAllUsersUseCase } from "@/domain/usecases/get-all-users.usecase";
import { UserDatasource } from "@/infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "@/infrastructure/repositories/user.repository-imp";
import { UserDiContext } from "./user.context";

export const UserDiProvider = ({ children }: PropsWithChildren) => {
  const userDatasource = useMemo(() => new UserDatasource(), []);
  const userRepositoryImp = useMemo(
    () => new UserRepositoryImp(userDatasource),
    [userDatasource]
  );
  const getAllUsersUseCase = useMemo(
    () => new GetAllUsersUseCase(userRepositoryImp),
    [userRepositoryImp]
  );

  const value = useMemo(
    () => ({ getAllUsersUseCase }),
    [getAllUsersUseCase]
  );

  return (
    <UserDiContext.Provider value={value}>
      {children}
    </UserDiContext.Provider>
  );
};