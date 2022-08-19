import { createSlice } from '@reduxjs/toolkit'
import { fetchSwaggerDocs, fetchSwaggerDocsFulfilled, fetchSwaggerDocsRejected } from './fetchSwaggerDocs'

import type { Path, Schema } from '@/types/index'

export interface APISpecState {
    paths: Record<string, Path>
    components: Schema
}

const initialState = {
    paths: {},
    components: {
        schemas: {},
        paths: {}
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