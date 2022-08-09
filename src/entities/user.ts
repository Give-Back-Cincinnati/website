export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    role: string | Record<string, unknown>
}