import { useEffect, useState, useCallback } from "react"
import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useRouter } from "next/router"
import { Events, useLazyGetEventsQuery, useUpdateEventsMutation } from "@/store/api/openApi"
import { DynamicForm } from "@/components/DynamicForm"
import { AddCustomField } from "@/components/Admin/Events/AddCustomField"
import { useGetSchema, useServices } from "hooks"

import { AdminEventRegistrations } from "@/components/Admin/Events/Registrations"

import styles from './[_id].module.scss'

export async function getStaticPaths () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`)
    const events: Events[] = await res.json()
    return {
        paths: events.map(event => ({ params: { _id: event._id }})),
        fallback: false
    }
}

export function getStaticProps (context: { params: { _id: string} }): { props: { _id: string } } {
    return { props: { _id: context.params._id } }
}

export const AdminEventDetails: NextPageWithLayout = () => {
    const { isReady, query } = useRouter()
    const [ editCustomFieldId, setEditCustomFieldId ] = useState<string | undefined>()
    const [ getEventsTrigger, { data: eventData, isSuccess }] = useLazyGetEventsQuery()
    const [ updateEventTrigger, updateEventResult] = useUpdateEventsMutation()
    
    const Toaster = useServices('Toaster')
    const eventSchema = useGetSchema('Events')

    useEffect(() => {
        if (isReady) {
            getEventsTrigger({ id: query._id })
        }
    }, [isReady, query, getEventsTrigger])

    useEffect(() => {
        if (updateEventResult.status === 'fulfilled') {
            Toaster.notify({ key: updateEventResult.requestId, title: 'Update Successful', intent: 'positive'})
        }
    }, [updateEventResult, Toaster])

    function handleEventUpdate (eventUpdate: Record<string, unknown>) {
        updateEventTrigger({ id: query._id, events: eventUpdate as Events })
    }

    const handleEditCustomField = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditCustomFieldId(e.currentTarget.dataset.fieldId)
    }, [])

    const clearEditCustomField = useCallback(() => {
        setEditCustomFieldId(undefined)
    }, [])

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
                        hiddenFields={['customFields']}
                    />
                : ''
            }
            <div>
                <h3>Custom Fields</h3>
                <ul>
                    {
                        eventData && eventData.customFields &&
                            Object.entries(eventData.customFields).map(([key, field], idx) => <li key={idx} className={styles.customFieldItem}>
                                { field.name }{ field.required ? ' (required)' : '' }
                                <span
                                    className={styles.editCustomField}
                                    onClick={handleEditCustomField}
                                    data-field-id={key}
                                >
                                    Edit
                                </span>
                            </li>)
                    }
                </ul>
            </div>
            {
                eventData && eventData._id &&
                <AddCustomField eventId={eventData?._id} editFieldId={editCustomFieldId} onSave={clearEditCustomField} />
            }
        </div>
        {
            query._id && typeof query._id === 'string' &&
                <AdminEventRegistrations eventId={query._id} />
        }
    </div>
}

AdminEventDetails.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default AdminEventDetails
