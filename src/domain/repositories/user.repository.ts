export abstract class UserRepository {
    abstract getUserById(userId: string): Promise<unknown>;
    abstract getAllUsers(): Promise<unknown[]>;
}