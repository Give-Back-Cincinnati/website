import { useState, useEffect, useMemo } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import Link from 'next/link'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useGetSchema, useUserHasPermission } from 'hooks'
import { Notify } from '@/components/DataDisplay'
import { Button, Modal, Confirm } from '@/components/Utils'

import { useSearchEventsQuery, useCreateEventsMutation, useDeleteEventsMutation, Events } from '@/store/api/openApi'
import { DynamicForm } from '@/components/Inputs/DynamicForm'
import { DateTime } from 'luxon'

const EventsAdmin: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useState(false)
    const schema = useGetSchema('Events')
    const {
        isSuccess,
        data,
        refetch,
    } = useSearchEventsQuery({})
    const canSeeEvents = useUserHasPermission('events.get')
    const canCreateEvent = useUserHasPermission('events.post')
    const canDeleteEvent = useUserHasPermission('events.id.delete')
    const [addEvent, { status, error, reset }] = useCreateEventsMutation()
    const [deleteEvent, { status: deleteStatus, error: deleteError, reset: deleteReset}] = useDeleteEventsMutation()

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
        newEvent.startTime = DateTime.fromFormat(newEvent.startTime, "yyyy-MM-dd'T'HH:mm").toISO()
        newEvent.endTime = DateTime.fromFormat(newEvent.endTime, "yyyy-MM-dd'T'HH:mm").toISO()
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
            actions: <div>
                <Link href={`/admin/Events/${obj._id}`}>
                    <a>
                        <Button variant='outlined'>
                            See Details
                        </Button>
                    </a>
                </Link>
                {
                    canDeleteEvent
                        ? <Confirm action='Delete' entityName={obj.name} onConfirm={() => handleDeleteConfirmation(obj._id)} />
                        : ''
                }
            </div>
        }))
    }, [data, canDeleteEvent, deleteEvent])

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
                    keys={['name', 'category', 'startTime', 'endTime', 'actions']}
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