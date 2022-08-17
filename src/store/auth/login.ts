import { IUser } from "@/types/user"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"


export const login = createAsyncThunk(
    'auth/login',
    async (
        { email, password }: { email: string, password: string }
    ): Promise<Error | { status: number, data?: IUser }> => {
        const { Axios } = useServices()
        try {
            const { status } = await Axios.post('/auth/login', {
                email,
                password
            })

            if (status === 204) {
                const { status, data } = await Axios.get('/users/me')
                return { status, data }
            }

            return { status }
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)
