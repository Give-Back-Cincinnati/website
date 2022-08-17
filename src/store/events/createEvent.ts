import { createAsyncThunk, CaseReducer, AnyAction } from "@reduxjs/toolkit"
import { EventsState } from "./slice"
import { useServices } from "services"

import type { IEvent } from '@/types/index'

export const createEvent = createAsyncThunk(
    'events/createEvent',
    async (event: IEvent): Promise<Error | { status: number, data: IEvent }> => {
        const { Axios } = useServices()
        try {
            const { status, data }: {status: number, data: IEvent } = await Axios.post(
                '/events',
                event
            )

            return { status, data }
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)

export const createEventFulfilled: CaseReducer = (state: EventsState, action: AnyAction) => {
    if ('data' in action.payload) {
        const event = action.payload.data as IEvent
        if (event._id) {
            state.events[event._id] = event
        }
    }
}

export const createEventRejected: CaseReducer = (state: EventsState, action: AnyAction) => {
    console.error(action)
}