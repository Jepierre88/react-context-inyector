export class UserDatasource {
    getAllUsers(): Promise<unknown[]> {
        return new Promise((resolve) => {
            resolve([
                { id: "1", name: "John Doe" },
                { id: "2", name: "Jane Smith" },
            ]);
        });
    }
    
    getUserById(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
}