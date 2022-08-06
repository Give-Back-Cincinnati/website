import { createAsyncThunk } from "@reduxjs/toolkit"
import { store } from 'store'
import { useServices } from "services"

import { fetchMe } from "./fetchMe"

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string } ) => {
        console.log('login')
        const { AxiosService } = useServices()
        try {
            const { status } = await AxiosService.post('/auth/login', {
                email,
                password
            })

            console.log(status)

            if (status === 204) {
                // toaster.success('Logged In!')
                store.dispatch(fetchMe())
            }

            return status
        } catch (e) {
            console.error(e)
            // toaster.danger('Incorrect Username/Password')
            return 401
        }
    }
)
