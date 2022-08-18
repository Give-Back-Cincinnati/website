import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertProps } from '@/components/Utils'
import { notify, notifyFulfilled } from './notify'

export interface ToasterState {
    notifications: AlertProps[]
}

const initialState = {
    notifications: []
}

export const toaster = (state: Partial<ToasterState> = initialState) => createSlice({
    name: 'toaster',
    initialState: {...initialState, ...state},
    reducers: {
        notify: (state, action: PayloadAction<AlertProps>) => {
            state.notifications.push(action.payload)
            window.setTimeout(() => {
                state.notifications.shift()
            }, 5000)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(notify.fulfilled, notifyFulfilled)
    }
})
