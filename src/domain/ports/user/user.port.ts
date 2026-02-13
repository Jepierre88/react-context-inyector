export abstract class UserPort {
    abstract getUserById(userId: string): Promise<unknown>;
    abstract getAllUsers(): Promise<unknown[]>;
}
