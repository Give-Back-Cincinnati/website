import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit"

import { logout } from './logout'

import type { IUser } from '@/types/user'

export interface AuthState {
    me?: IUser
    isAuthenticated: boolean
}

const initialState: AuthState = {
    me: undefined,
    isAuthenticated: false
}

export const auth = (state: Partial<AuthState> = initialState) => createSlice({
    name: 'user',
    initialState: { ...initialState, ...state },
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.me = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
            switch (action.payload) {
                case 204:
                    state.isAuthenticated = false
                    state.me = undefined
                    break
            }
        })

        // set user to logged out on rejected auth thunks
        builder.addMatcher((action: AnyAction) => {
            let isMatch = false
            
            if (
                action.meta
                && 'requestStatus' in action.meta
                && action.meta.requestStatus === 'rejected'
                && !action.type.includes('logout')
            ) {
                isMatch = true
            }

            return isMatch
        }, (state) => {
            state.me = undefined
            state.isAuthenticated = false
            window.localStorage.removeItem('isLoggedIn')
        })

        // handles all fulfilled actions for login, fetchMe, and googleOauth20Callback
        builder.addMatcher((action: AnyAction) => {
            let isMatch = false
            
            if (
                action.meta
                && 'requestStatus' in action.meta
                && action.meta.requestStatus === 'fulfilled'
                && !action.type.includes('logout')
            ) {
                isMatch = true
            }

            return isMatch
        }, (state, action: PayloadAction<{ status: number, data?: IUser }>) => {
            const { status, data } = action.payload

            if (data) {
                state.me = data
            }

            switch (status) {
                case 200:
                    state.isAuthenticated = true
                    window.localStorage.setItem('isLoggedIn', 'true')
                    break;
                case 204:
                        state.isAuthenticated = true
                        window.localStorage.setItem('isLoggedIn', 'true')
                    break;
                default:
                    state.isAuthenticated = false
                    window.localStorage.setItem('isLoggedIn', 'false')
            }
        })

    }
})
