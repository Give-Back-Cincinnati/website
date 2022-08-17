import { configureStore } from "@reduxjs/toolkit"
import { auth, AuthState } from '@/store/auth/slice'
import { admin, AdminState } from '@/store/admin/slice'
import { events, EventsState } from "@/store/events/slice"

export interface InitialState {
    auth?: Partial<AuthState>
    admin?: Partial<AdminState>
    events?: Partial<EventsState>
}

export const createStore = (initialState?: InitialState) => configureStore({
    reducer: {
        auth: auth(initialState?.auth).reducer,
        admin: admin(initialState?.admin).reducer,
        events: events(initialState?.events).reducer,
    }
})

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
