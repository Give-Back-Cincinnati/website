import { createAsyncThunk } from "@reduxjs/toolkit"
import { Services } from 'services'

export const logout = createAsyncThunk(
    'auth/logout',
    async (): Promise<Error | number> => {
        const { Axios } = Services
        try {
            const { status } = await Axios.get('/auth/logout')
            return status
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)