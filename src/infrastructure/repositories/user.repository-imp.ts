import type { UserRepository } from "../../domain/repositories/user.repository";
import type { UserDatasource } from "../datasources/user.datasource";

export class UserRepositoryImp implements UserRepository {
    private readonly userDatasource: UserDatasource;

    constructor(userDatasource: UserDatasource) {
        this.userDatasource = userDatasource;
    }

    getAllUsers(): Promise<unknown[]> {
        return this.userDatasource.getAllUsers();
    }

    getUserById(): Promise<unknown> {
        return this.userDatasource.getUserById();
    }
}