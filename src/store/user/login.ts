import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"


export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string } ) => {
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
            console.error(e)
            // toaster.danger('Incorrect Username/Password')
            return 401
        }
    }
)
