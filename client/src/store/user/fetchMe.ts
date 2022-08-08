import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async () => {
        const { Axios } = useServices()
        try {
            const  { data } = await Axios.get('/users/me')
            return data
        } catch (e) {
            return
        }
    }
)