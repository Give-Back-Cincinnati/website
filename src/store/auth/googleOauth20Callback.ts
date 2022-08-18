import { createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "@/types/user"
import { Services } from "services"
import axios, { AxiosInstance } from "axios"
import { ToasterService } from "services/toasterService"

export const googleOauth20Callback = createAsyncThunk(
    'auth/googleOauth20Callback',
    async (callbackUrl: string): Promise<Error | { status: number, data?: IUser} | Error> => {
        const { Axios, Toaster } = Services
        try {
            const { status } = await (Axios as AxiosInstance).get(callbackUrl);

            (Toaster as ToasterService).notify({ key: Math.random().toString(), title: status.toString() })

            if (status === 204) {
                const { data } = await (Axios as AxiosInstance).get('/users/me')
                return { status, data }
            }

            return { status }
        } catch (e) {
            // write a handle error function to make life easier
            if (axios.isAxiosError(e)) {
                (Toaster as ToasterService).notify({ key: Math.random().toString(), title: e.response?.statusText || e.message, intent: 'negative' })
            }
            return Promise.reject(e as Error)
        }
    }
)
