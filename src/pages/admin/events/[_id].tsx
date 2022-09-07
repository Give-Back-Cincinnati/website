import { useEffect } from "react"
import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useRouter } from "next/router"
import { useLazyGetEventsByEventIdRegisterQuery, useLazyGetEventsQuery } from "@/store/api/openApi"
import { DynamicForm } from "@/components/Inputs"
import { useGetSchema } from "hooks"
import { Table } from "@/components/DataDisplay"

import styles from './[_id].module.scss'

export const AdminEventDetails: NextPageWithLayout = () => {
    const { isReady, query } = useRouter()
    const [ getEventsTrigger, { data: eventData, isSuccess }] = useLazyGetEventsQuery()
    const [ getEventRegistrations, { data: eventRegistrations }] = useLazyGetEventsByEventIdRegisterQuery()
    const eventSchema = useGetSchema('Events')

    useEffect(() => {
        if (isReady) {
            getEventsTrigger({ id: query._id })
            getEventRegistrations({ eventId: query._id })
        }
    }, [isReady, query, getEventsTrigger, getEventRegistrations])

    return <div className={styles.container}>
        <div>
            <h2>
                Event Details: 
            </h2>
            {
                eventSchema && isSuccess
                ?   <DynamicForm
                        entity={eventSchema}
                        onSubmit={() => {}}
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
