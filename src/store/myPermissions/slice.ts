import { createSlice } from '@reduxjs/toolkit'
import type { Permissions } from '../api/openApi'

export interface myPermissionsState {
    myPermissions: Record<string, Permissions>
}

const initialState = {
    myPermissions: {}
}

export const myPermissions = (state: Partial<myPermissionsState> = initialState) => createSlice({
    name: 'myPermissions',
    initialState: { ...initialState, ...state},
    reducers: {},
    extraReducers: builder => {
        // This matcher will match ALL routes
        //  If the payload matches the getMe endpoint, serialize permissions and store as an object
        builder.addMatcher(() => true, (state, action) => {
            if (
                action.meta
                && action.meta.arg
                && action.meta.requestStatus === 'fulfilled'
                && action.meta?.arg.endpointName === 'getMe'
            ) {
                const { payload } = action
                const permissionsArr: Permissions[] = payload.role.permissions

                const myPermissions: Record<string, Permissions> = {};
                permissionsArr.forEach(permission => {
                    myPermissions[permission.name] = permission
                })
                state.myPermissions = myPermissions
            }
        })
    }
})