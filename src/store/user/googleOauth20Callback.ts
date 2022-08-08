import { createAsyncThunk } from "@reduxjs/toolkit"
import { useServices } from "services"
import { useAppDispatch } from "store/hooks"
import { fetchMe } from "./index"

export const googleOauth20Callback = createAsyncThunk(
    'user/googleOauth20Callback',
    async (callbackUrl: string) => {
        const { Axios } = useServices()
        const dispatch = useAppDispatch()
        try {
            const { status } = await Axios.get(callbackUrl)

            if (status === 204) {
                // toaster.success('Logged In!')
                dispatch(fetchMe())
            }

            return status
        } catch (e) {
            console.error(e)
            return
        }
    }
)
