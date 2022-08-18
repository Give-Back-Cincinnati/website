import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertProps } from '@/components/Utils'

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
        },
        remove: (state) => {
            state.notifications.shift()
        }
    }
})
