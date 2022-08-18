import { createAsyncThunk, CaseReducer, AnyAction } from '@reduxjs/toolkit'
import { EventsState } from './slice'
import { Services } from 'services'

import type { IEvent } from '@/types/index'

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (): Promise<Error | { status: number, data: IEvent[] }> => {
        const { Axios } = Services
        try {
            const { status, data }: { status: number, data: IEvent[]} = await Axios.get('/events')

            return { status, data }
        } catch (e) {
            return Promise.reject(e as Error)
        }
    }
)

export const fetchEventsFulfilled: CaseReducer = (state: EventsState, action: AnyAction) => {
    if ('data' in action.payload) {
        action.payload.data.forEach((event: IEvent) => {
            if (event._id) {
                state.events[event._id] = event
            }
        })
    }
}

export const fetchEventsRejected: CaseReducer = (state: EventsState, action: AnyAction) => {
    console.error(action)
}