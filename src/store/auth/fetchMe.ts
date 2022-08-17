import { IUser } from "@/types/user"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"

export const fetchMe = createAsyncThunk(
    'auth/fetchMe',
    async (): Promise<Error | { status: number, data: IUser }> => {
        const { Axios } = useServices()
        try {
            const  { status, data } = await Axios.get('/users/me')
            return { status, data }
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)