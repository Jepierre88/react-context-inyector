import type { UserRepository } from "../repositories/user.repository";

export class GetAllUsersUseCase {
    private readonly userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return this.userRepository.getAllUsers();
    }
}