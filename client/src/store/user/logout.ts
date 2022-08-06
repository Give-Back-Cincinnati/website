import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"

export const logout = createAsyncThunk(
    'user/logout',
    async (): Promise<boolean | number> => {
        const { AxiosService } = useServices()
        try {
            const { status } = await AxiosService.get('/auth/logout')
            return status
        } catch (e) {
            return false
        }
    }
)