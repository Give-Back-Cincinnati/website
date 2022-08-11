import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSwaggerDocs, fetchSwaggerDocsFulfilled, fetchSwaggerDocsRejected } from './fetchSwaggerDocs'
import axios from 'axios'

import type { Path, Schema } from '@/types/index'

export interface AdminState {
    paths: Record<string, Path>
    components: Schema
}

const initialState = {
    paths: {},
    components: {}
}

export const admin = (state: Partial<AdminState> = initialState) => createSlice({
    name: 'admin',
    initialState: { ...initialState, ...state},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSwaggerDocs.fulfilled, fetchSwaggerDocsFulfilled)
        builder.addCase(fetchSwaggerDocs.rejected, fetchSwaggerDocsRejected)
    }
})