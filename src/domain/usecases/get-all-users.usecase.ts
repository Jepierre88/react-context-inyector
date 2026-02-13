import type { UserPort } from "../ports/user/user.port";

export class GetAllUsersUseCase {
    private readonly userPort: UserPort;
    constructor(userPort: UserPort) {
        this.userPort = userPort;
    }

    async execute() {
        return this.userPort.getAllUsers();
    }
}