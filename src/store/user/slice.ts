import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { login } from './login'
import { logout } from './logout'
import { fetchMe } from './fetchMe'
import { googleOauth20Callback } from "./googleOauth20Callback"

import type { IUser } from '@/types/user'
import axios from "axios"

export interface UserState {
    me?: IUser
    isAuthenticated: boolean
}

const initialState: UserState = {
    me: undefined,
    isAuthenticated: false
}

export const user = (state: Partial<UserState> = initialState) => createSlice({
    name: 'user',
    initialState: { ...initialState, ...state },
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.me = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.me = action.payload
            if (action.payload) {
                state.isAuthenticated = true
            }
        })

        builder.addCase(login.fulfilled, (state, action) => {
            switch (action.payload) {
                case 401:
                    state.isAuthenticated = false
                    break;
                case 204:
                    state.isAuthenticated = true
                    break;
                default:
                    state.isAuthenticated = false
            }
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            switch (action.payload) {
                case 204:
                    state.isAuthenticated = false
                    state.me = undefined
                    break
            }
        })

        builder.addCase(googleOauth20Callback.fulfilled, (state, action) => {
            if (axios.isAxiosError(action.payload)) {
                console.log('error occurred')
                return
            }
            if ('data' in action.payload) {
                state.me = action.payload.data
            }
            switch (action.payload.status) {
                case 204:
                    state.isAuthenticated = true
            }
        })
    }
})
