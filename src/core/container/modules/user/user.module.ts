import { asClass, asFunction } from "awilix";
import { UserDatasource } from "@/infrastructure/datasources/user.datasource";
import { UserRepositoryImp } from "@/infrastructure/repositories/user.repository-imp";
import { GetAllUsersUseCase } from "@/domain/usecases/get-all-users.usecase";
import type { DIContainerCradle } from "../../container";

export const userModule = {
  userDatasource: asClass(UserDatasource).singleton(),
  userRepository: asFunction(
    ({ userDatasource }: DIContainerCradle) =>
      new UserRepositoryImp(userDatasource)
  ).singleton(),
  getAllUsersUseCase: asFunction(
    ({ userRepository }: DIContainerCradle) =>
      new GetAllUsersUseCase(userRepository)
  ).singleton(),
};
