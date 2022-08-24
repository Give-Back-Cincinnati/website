import { useState, useEffect } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useGetSchema, useUserHasPermission } from 'hooks'
import { Notify } from '@/components/DataDisplay'
import { Button } from '@/components/Utils'
import { Modal } from '@/components/Utils'

import { useSearchEventsQuery, useCreateEventsMutation, Events } from '@/store/api/openApi'
import { DynamicForm } from '@/components/Inputs/DynamicForm'

const EventsAdmin: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useState(false)
    const schema = useGetSchema('Events')
    const {
        isSuccess,
        data,
        refetch,
    } = useSearchEventsQuery()
    const canSeeEvents = useUserHasPermission('events.get')
    const canCreateEvent = useUserHasPermission('events.post')
    const [addEvent, { status, error, reset }] = useCreateEventsMutation()

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

    function handleCreateEventSubmit (data: Record<string, unknown>): void {
        const newEvent = data as Events
        addEvent({
            events: newEvent
        })
    }

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
                    keys={['name', 'category', 'description', 'startTime', 'endTime']}
                    data={data}
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