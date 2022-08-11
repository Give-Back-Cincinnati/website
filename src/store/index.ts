import { configureStore } from "@reduxjs/toolkit"
import { user, UserState } from '@/store/user/slice'
import { admin, AdminState } from '@/store/admin/slice'

export interface InitialState {
    user?: Partial<UserState>
    admin?: Partial<AdminState>
}

export const createStore = (initialState?: InitialState) => configureStore({
    reducer: {
        user: user(initialState?.user).reducer,
        admin: admin(initialState?.admin).reducer
    }
})

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
