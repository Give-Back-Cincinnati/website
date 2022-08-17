import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"

export const logout = createAsyncThunk(
    'user/logout',
    async (): Promise<Error | number> => {
        const { Axios } = useServices()
        try {
            const { status } = await Axios.get('/auth/logout')
            return status
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)