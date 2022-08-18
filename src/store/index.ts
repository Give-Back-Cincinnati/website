import { configureStore } from "@reduxjs/toolkit"
import { auth, AuthState } from '@/store/auth/slice'
import { admin, AdminState } from '@/store/admin/slice'
import { events, EventsState } from "@/store/events/slice"
import { toaster, ToasterState } from "@/store/toaster/slice"

import { apiSlice } from "./api/apiSlice"

export interface InitialState {
    auth?: Partial<AuthState>
    admin?: Partial<AdminState>
    events?: Partial<EventsState>
    toaster?: Partial<ToasterState>
}

export const createStore = (initialState?: InitialState) => {
    let authSlice = auth(initialState?.auth)
    let adminSlice = admin(initialState?.admin)
    let eventsSlice = events(initialState?.events)
    let toasterSlice = toaster(initialState?.toaster)

    return {
        actions: {
            auth: authSlice.actions,
            admin: adminSlice.actions,
            events: eventsSlice.actions,
            toaster: toasterSlice.actions
        },
        store: configureStore({
            reducer: {
                auth: authSlice.reducer,
                admin: adminSlice.reducer,
                events: eventsSlice.reducer,
                toaster: toasterSlice.reducer,
                [apiSlice.reducerPath]: apiSlice.reducer
            },
            middleware: getDefaultMiddleware => 
                getDefaultMiddleware().concat(apiSlice.middleware)
        }
    )}
}

export const { store, actions } = createStore()

export type Actions = typeof actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
