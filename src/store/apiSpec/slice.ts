import { createSlice } from '@reduxjs/toolkit'
import { fetchSwaggerDocs, fetchSwaggerDocsFulfilled, fetchSwaggerDocsRejected } from './fetchSwaggerDocs'

import type { Path, Components } from '@/types/index'

export interface APISpecState {
    paths: Record<string, Path>
    components: Components
}

const initialState = {
    paths: {},
    components: {
        schemas: {},
        securitySchemas: {}
    }
}

export const apiSpec = (state: Partial<APISpecState> = initialState) => createSlice({
    name: 'admin',
    initialState: { ...initialState, ...state},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSwaggerDocs.fulfilled, fetchSwaggerDocsFulfilled)
        builder.addCase(fetchSwaggerDocs.rejected, fetchSwaggerDocsRejected)
    }
})