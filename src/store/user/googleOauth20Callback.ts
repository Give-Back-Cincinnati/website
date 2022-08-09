import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"
import { store } from '@/store/index'
import { fetchMe } from "./index"

export const googleOauth20Callback = createAsyncThunk(
    'user/googleOauth20Callback',
    async (callbackUrl: string) => {
        const { Axios } = useServices()
        try {
            const { status } = await Axios.get(callbackUrl)
            if (status === 204) {
                // toaster.success('Logged In!')
                // store.dispatch(fetchMe())
            }

            return status
        } catch (e) {
            console.log(e)
            return
        }
    }
)
