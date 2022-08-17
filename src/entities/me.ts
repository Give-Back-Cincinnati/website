import { IUser } from "./user"
import { IRoles } from "./roles"

export interface Me extends IUser {
    role: IRoles
}