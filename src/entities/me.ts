import { IUser } from "./user"

export interface Me extends IUser {
    role: Record<string, unknown>
}