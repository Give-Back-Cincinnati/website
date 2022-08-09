import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"
import { IUser } from "@/types/user"
import { AxiosError } from "axios"

export const googleOauth20Callback = createAsyncThunk(
    'user/googleOauth20Callback',
    async (callbackUrl: string): Promise<{ status: number, data?: IUser} | AxiosError> => {
        const { Axios } = useServices()
        try {
            const { status } = await Axios.get(callbackUrl)

            if (status === 204) {
                const { data } = await Axios.get('/users/me')
                return { status, data }
            }

            return { status }
        } catch (e) {
            return e as AxiosError
        }
    }
)
