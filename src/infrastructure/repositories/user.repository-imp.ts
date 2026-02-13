import type { UserPort } from "../../domain/ports/user/user.port";
import type { UserDatasource } from "../datasources/user.datasource";

export class UserRepositoryImp implements UserPort {
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