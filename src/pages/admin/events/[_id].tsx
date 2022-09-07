import { useEffect } from "react"
import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useRouter } from "next/router"
import { Events, useLazyGetEventsByEventIdRegisterQuery, useLazyGetEventsQuery, useUpdateEventsMutation } from "@/store/api/openApi"
import { DynamicForm } from "@/components/Inputs"
import { useGetSchema, useServices } from "hooks"
import { Table } from "@/components/DataDisplay"

import styles from './[_id].module.scss'

export const AdminEventDetails: NextPageWithLayout = () => {
    const { isReady, query } = useRouter()
    const [ getEventsTrigger, { data: eventData, isSuccess }] = useLazyGetEventsQuery()
    const [ updateEventTrigger, updateEventResult] = useUpdateEventsMutation()
    const [ getEventRegistrations, { data: eventRegistrations }] = useLazyGetEventsByEventIdRegisterQuery()
    const Toaster = useServices('Toaster')
    const eventSchema = useGetSchema('Events')

    useEffect(() => {
        if (isReady) {
            getEventsTrigger({ id: query._id })
            getEventRegistrations({ eventId: query._id })
        }
    }, [isReady, query, getEventsTrigger, getEventRegistrations])

    useEffect(() => {
        if (updateEventResult.status === 'fulfilled') {
            Toaster.notify({ key: updateEventResult.requestId, title: 'Update Successful', intent: 'positive'})
        }
    }, [updateEventResult, Toaster])

    function handleEventUpdate (eventUpdate: Record<string, unknown>) {
        updateEventTrigger({ id: query._id, events: eventUpdate as Events })
    }

    return <div className={styles.container}>
        <div>
            <h2>
                Event Details: 
            </h2>
            {
                eventSchema && isSuccess
                ?   <DynamicForm
                        entity={eventSchema}
                        onSubmit={handleEventUpdate}
                        values={eventData}
                    />
                : ''
            }
        </div>
        <div>
            <h2>Registrations: {eventRegistrations?.length || 0}</h2>
            {
                eventRegistrations &&
                <Table
                    keys={['firstName', 'lastName', 'phone', 'email', 'dateOfBirth', 'checkedIn', 'hasAgreedToTerms']}
                    data={eventRegistrations}
                />
            }
        </div>
    </div>
}

AdminEventDetails.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default AdminEventDetails
