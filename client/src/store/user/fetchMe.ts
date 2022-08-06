import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async () => {
        const { AxiosService } = useServices()
        try {
            const  { data } = await AxiosService.get('/users/me')
            return data
        } catch (e) {
            return
        }
    }
)