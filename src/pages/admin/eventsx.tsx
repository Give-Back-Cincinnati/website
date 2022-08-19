import { useState } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useUserHasPermission } from 'hooks'

import { Button } from '@/components/Utils'
import { Modal } from '@/components/Utils'

import { useSearchEventsQuery, useCreateEventsMutation, CreateEventsApiArg, Events } from '@/store/api/openApi'

const EventsAdmin: NextPageWithLayout = () => {
    const [isOpen, setOpen] = useState(false)
    const {
        isSuccess,
        data
     } = useSearchEventsQuery()
     const canSeeEvents = useUserHasPermission('events.get')
     const canCreateEvent = useUserHasPermission('events.post')


     const [addEvent, { status, error, data: response }] = useCreateEventsMutation()

     const event = {
        name: 'Hello World!',
        description: 'Event 2',
        category: 'Hands-On',
        address: '312 Walnut',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
    } as Events

    return <div
    // onClick={() => addEvent({
    //     events: event
    // } as CreateEventsApiArg)}
    >
        {
            canCreateEvent
                ? <Button onClick={() => setOpen(true)}>Create Event</Button>
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

        <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)} >
            <div>
                This is a div
            </div>
        </Modal>
    </div>
}

EventsAdmin.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default EventsAdmin