import { createSlice } from '@reduxjs/toolkit'
import { createEvent, createEventFulfilled, createEventRejected } from './createEvent'
import { fetchEvents, fetchEventsFulfilled, fetchEventsRejected } from './fetchEvents'
import type { IEvent } from '@/types/event'


export interface EventsState {
    events: Record<string, IEvent>
}

const initialState = {
    events: {}
}

export const events = (state: Partial<EventsState> = initialState) => createSlice({
    name: 'events',
    initialState: {...initialState, ...state},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEvent.fulfilled, createEventFulfilled)
        builder.addCase(createEvent.rejected, createEventRejected)
        
        builder.addCase(fetchEvents.fulfilled, fetchEventsFulfilled)
        builder.addCase(fetchEvents.rejected, fetchEventsRejected)
    }
})