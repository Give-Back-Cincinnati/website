import { createAsyncThunk, CaseReducer } from "@reduxjs/toolkit"
import { AdminState } from "./slice"
import { Services } from 'services'

import type { Path, Schema } from '@/types/index'

export const fetchSwaggerDocs = createAsyncThunk(
    'admin/fetchSwaggerDocs',
    async (): Promise<Error | { status: number, data: Record<string, unknown>}> => {
        const { Axios } = Services
        try {
            const { status, data } = await Axios.get('/docs/swagger.json')
            if (typeof data === 'object') {
                return { status, data }
            }
            return Promise.reject(new Error('Failed to load administrative data'))
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)

export const fetchSwaggerDocsFulfilled: CaseReducer = (state: AdminState, action) => {
    if ('data' in action.payload) {
        state.paths = action.payload.data.paths as Record<string, Path>
        state.components = action.payload.data.components as Schema
    }
}

export const fetchSwaggerDocsRejected: CaseReducer = (state: AdminState, action) => {
    console.error(action)
}