import { configureStore } from "@reduxjs/toolkit"
import { myPermissions, myPermissionsState } from '@/store/myPermissions/slice'
import { toaster, ToasterState } from "@/store/toaster/slice"
import { apiSpec, APISpecState } from "@/store/apiSpec/slice"

import { apiSlice } from "./api/apiSlice"

export interface InitialState {
    myPermissions?: Partial<myPermissionsState>
    toaster?: Partial<ToasterState>
    apiSpec?: Partial<APISpecState>
}

export const createStore = (initialState?: InitialState) => {
    let myPermissionsSlice = myPermissions(initialState?.myPermissions)
    let toasterSlice = toaster(initialState?.toaster)
    let apiSpecSlice = apiSpec(initialState?.apiSpec)

    return {
        actions: {
            myPermissions: myPermissionsSlice.actions,
            toaster: toasterSlice.actions,
            apiSpec: apiSpecSlice.actions
        },
        store: configureStore({
            reducer: {
                myPermissions: myPermissionsSlice.reducer,
                toaster: toasterSlice.reducer,
                apiSpec: apiSpecSlice.reducer,
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
