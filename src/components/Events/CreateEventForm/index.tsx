import { useState, ChangeEvent } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { createEvent } from '@/store/events'

import { TextField, DateTimePicker } from '@/components/Inputs'
import { Button } from '@/components/Utils'

import { DateTime } from 'luxon'

import type { IEvent } from '@/types/event'

const emptyEvent: IEvent = {
    name: '',
    description: '',
    category: 'Hands On',
    address: '',
    startTime: DateTime.now().toISO(),
    endTime: DateTime.now().toISO()
}

export const CreateEventForm = () => {
    const [eventForm, setEventForm] = useState(emptyEvent)

    const dispatch = useAppDispatch()

    function handleInputChange (e: ChangeEvent<HTMLInputElement>) {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value })
    }

    return <div>
            <TextField
                label='Event Name'
                name='name'
                value={eventForm.name}
                onChange={handleInputChange}
            />
            <TextField
                label='Event Description'
                name='description'
                value={eventForm.description}
                onChange={handleInputChange}
            />
            <TextField
                label='Event Address'
                name='address'
                value={eventForm.address}
                onChange={handleInputChange}
            />

            <DateTimePicker
                label='Start Time'
                name='startTime'
                value={eventForm.startTime.toString()}
                onChange={handleInputChange}
            />
            <DateTimePicker
                label='End Time'
                name='endTime'
                value={eventForm.endTime.toString()}
                onChange={handleInputChange}
            />

            <Button onClick={() => dispatch(createEvent(eventForm as IEvent))}>
                Submit
            </Button>
    </div>
}