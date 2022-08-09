import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { login } from './login'
import { logout } from './logout'
import { fetchMe } from './fetchMe'
import { googleOauth20Callback } from "./googleOauth20Callback"

import type { IUser } from '@/types/user'

export interface UserState {
    me?: IUser
    isAuthenticated: boolean
}

const initialState: UserState = {
    me: undefined,
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
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
            switch (action.payload) {
                case 204:
                    state.isAuthenticated = true
            }
        })
    }
})

export default userSlice.reducer