import axios from "axios"


export class BaseHttpService {
    protected baseUrl: string = "";
    async get<T>(endpoint: string, params?: Record<string, never>): Promise<T> {
        const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, { params, timeout: 5000 },);
        return response.data;
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
        return response.data;
    }


}