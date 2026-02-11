import type { HttpStatusCode } from "axios";

export interface IGeneralResponse<T> {
    status: HttpStatusCode;
    data: T;
}