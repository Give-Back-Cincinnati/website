import { configureStore } from "@reduxjs/toolkit"
import { user, UserState } from './user/slice'

export interface InitialState {
    user?: Partial<UserState>
}

export const createStore = (initialState?: InitialState) => configureStore({
    reducer: {
        user: user(initialState?.user).reducer,
    }
})

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
