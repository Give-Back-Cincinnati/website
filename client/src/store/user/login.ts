import { createAsyncThunk } from "@reduxjs/toolkit"
import { useAppDispatch } from "store/hooks"
import { useServices } from "services"

import { fetchMe } from "./fetchMe"

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string } ) => {
        console.log('login')
        const { Axios } = useServices()
        const dispatch = useAppDispatch()
        try {
            const { status } = await Axios.post('/auth/login', {
                email,
                password
            })

            console.log(status)

            if (status === 204) {
                // toaster.success('Logged In!')
                dispatch(fetchMe())
            }

            return status
        } catch (e) {
            console.error(e)
            // toaster.danger('Incorrect Username/Password')
            return 401
        }
    }
)
