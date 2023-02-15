import { useState, useEffect, useMemo } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import Link from 'next/link'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useGetSchema, useUserHasPermission } from 'hooks'
import { Notify } from '@/components/DataDisplay'
import { Button, Modal, Confirm } from '@/components/Utils'

import {
    useSearchEventsQuery,
    useSearchRegistrationsQuery,
    useCreateEventsMutation,
    useDeleteEventsMutation, 
    Events
} from '@/store/api/openApi'
import { DynamicForm } from '@/components/DynamicForm'
import { DateTime } from 'luxon'

const EventsAdmin: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useState(false)
    const schema = useGetSchema('Events')
    const {
        isSuccess,
        data,
        refetch,
    } = useSearchEventsQuery({})
    const {
        data: registrationInformation
    } = useSearchRegistrationsQuery()
    const canSeeEvents = useUserHasPermission('events.get')
    const canCreateEvent = useUserHasPermission('events.post')
    const canDeleteEvent = useUserHasPermission('events.id.delete')
    const [addEvent, { status, error, reset }] = useCreateEventsMutation()
    const [deleteEvent, { status: deleteStatus, error: deleteError, reset: deleteReset}] = useDeleteEventsMutation()

    const formattedEventRegistrations = useMemo(() => {
        if (!registrationInformation) return {}
        return registrationInformation.reduce((acc: Record<string, number>, { _id, numRegistrations }) => {
            acc[_id] = numRegistrations
            return acc
        }, {})
    }, [registrationInformation])

    useEffect(() => {
        if (status === 'fulfilled') {
            setOpen(false)
            reset()
            refetch()
            Notify({ title: 'Event Created', intent: 'positive' })
        }

        if (error) {
            reset()
        }

    }, [status, reset, refetch, error])

    useEffect(() => {
        if (deleteStatus === 'fulfilled') {
            deleteReset()
            refetch()
            Notify({ title: 'Event Deleted', intent: 'warning' })
        }
        if (deleteError) {
            deleteReset()
            Notify({ title: (deleteError as Error).message, intent: 'negative' })
        }
    }, [deleteReset, deleteStatus, deleteError, refetch])

    function handleCreateEventSubmit (data: Record<string, unknown>): void {
        const newEvent = data as Events
        addEvent({
            events: newEvent
        })
    }

    
    const formattedData = useMemo(() => {
        if (data === undefined) {
            return []
        }

        function handleDeleteConfirmation (id: string | undefined) {
            if (!id) return
            deleteEvent({
                id
            })
        }

        return data.map(obj => ({
            ...obj,
            startTime: DateTime.fromISO(obj.startTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
            endTime: DateTime.fromISO(obj.endTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
            registrations: (obj._id && typeof formattedEventRegistrations[obj._id] === 'number' ? formattedEventRegistrations[obj._id] : 0).toString(),
            actions: <div>
                <Link href={`/admin/events/${obj._id}`} passHref>

                    <Button variant='outlined'>
                        See Details
                    </Button>

                </Link>
                {
                    canDeleteEvent
                        ? <Confirm action='Delete' entityName={obj.name} onConfirm={() => handleDeleteConfirmation(obj._id)} />
                        : ''
                }
            </div>
        }));
    }, [data, canDeleteEvent, deleteEvent, formattedEventRegistrations])

    return <div>
        <h2>
            Events
        </h2>
        {
            canCreateEvent && schema
                ? <>
                    <Button onClick={() => setOpen(true)}>Create Event</Button>
                    <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)} >
                        <DynamicForm
                            entity={schema}
                            onSubmit={handleCreateEventSubmit}
                            isLoading={status === 'pending'}
                        />
                    </Modal>
                </>
                : ''
        }
        {
            isSuccess && canSeeEvents
                ? <Table
                    keys={['name', 'category', 'startTime', 'endTime', 'registrations', 'actions']}
                    data={formattedData}
                />
                : ''
        }
    </div>
}

EventsAdmin.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default EventsAdmin