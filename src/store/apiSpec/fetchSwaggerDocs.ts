import { createAsyncThunk, CaseReducer } from "@reduxjs/toolkit"
import { APISpecState } from "./slice"
import { Services } from "services"
import { AxiosInstance } from "axios"

import type { Path, Components } from '@/types/index'
import { ToasterService } from "services/toasterService"

export const fetchSwaggerDocs = createAsyncThunk(
    'apiSpec/fetchSwaggerDocs',
    async (): Promise<Error | { status: number, data: Record<string, unknown>}> => {
        const { Axios, Toaster } = Services
        try {
            const { status, data } = await (Axios as AxiosInstance).get('/docs/swagger.json')
            if (typeof data === 'object') {
                return { status, data }
            }
            (Toaster as ToasterService).notify({ key: Math.random().toString(), title: 'Failed to load required data', intent: 'negative' })
            return Promise.reject(new Error('Failed to load required data'))
        } catch (e) {
            (Toaster as ToasterService).notify({ key: Math.random().toString(), title: 'Failed to load required data', intent: 'negative' })
            return Promise.reject(e as Error)
        }
    }
)

export const fetchSwaggerDocsFulfilled: CaseReducer = (state: APISpecState, action) => {
    if ('data' in action.payload) {
        state.paths = action.payload.data.paths as Record<string, Path>
        state.components = action.payload.data.components as Components
    }
}

export const fetchSwaggerDocsRejected: CaseReducer = (state: APISpecState, action) => {

}