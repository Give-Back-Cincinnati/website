import { createAsyncThunk, CaseReducer, AnyAction } from "@reduxjs/toolkit"
import { ToasterState } from "./slice"
import type { AlertProps } from "@/components/Utils"

export const notify = createAsyncThunk(
    'toaster/notify',
    async (alert: AlertProps): Promise<AlertProps> => {
        return alert
    }
)

export const notifyFulfilled: CaseReducer = (state: ToasterState, action: AnyAction) => {
    state.notifications.push(action.payload)
}