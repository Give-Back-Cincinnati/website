import { IRoles } from "./roles"

export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    role: string | IRoles
}