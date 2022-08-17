import { ChangeEvent, useState, useMemo, useEffect } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

import { AdminLayout } from '../../layouts/AdminLayout'

import { Table } from '@/components/DataDisplay'

import { fetchEvents } from '@/store/events'

const EventsAdmin: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()
    const events = useAppSelector(state => state.events)

    const eventsForTable = useMemo(() => {
        let transformedEvents: Record<string, string>[] = []

        Object.values(events.events).forEach((event) => {
            transformedEvents.push(event as Record<string, string>)
        })

        return transformedEvents
    }, [events])

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    return <div>
        <Table
            keys={['name', 'category', 'description', 'startTime', 'endTime']}
            data={eventsForTable}
        />
    </div>
}

EventsAdmin.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default EventsAdmin