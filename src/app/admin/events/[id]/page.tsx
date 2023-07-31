"use client"
import { useEffect, useState, useCallback } from "react"
import { Events, useGetEventsQuery, useUpdateEventsMutation } from "@/store/api/openApi"
import { DynamicForm } from "@/components/DynamicForm"
import { AddCustomField } from "@/components/Admin/Events/AddCustomField"
import { useGetSchema, useServices } from "hooks"

import { AdminEventRegistrations } from "@/components/Admin/Events/Registrations"

import styles from './[_id].module.scss'

export async function generateStaticParams () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`)
    const events: Events[] = await res.json()
    return events.map(event => ({ _id: event._id }))
}

const AdminEventDetails = (props: { params: { id: string }}) => {
    const [ editCustomFieldId, setEditCustomFieldId ] = useState<string | undefined>()
    const { data: eventData, isSuccess } = useGetEventsQuery({ id: props.params.id })
    const [ updateEventTrigger, updateEventResult] = useUpdateEventsMutation()
    
    const Toaster = useServices('Toaster')
    const eventSchema = useGetSchema('Events')

    useEffect(() => {
        if (updateEventResult.status === 'fulfilled') {
            Toaster.notify({ key: updateEventResult.requestId, title: 'Update Successful', intent: 'positive'})
        }
    }, [updateEventResult, Toaster])

    function handleEventUpdate (eventUpdate: Record<string, unknown>) {
        updateEventTrigger({ id: props.params.id, events: eventUpdate as Events })
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
                                { field.name }{ field.isRequired ? ' (required)' : '' }
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
            props.params.id && typeof props.params.id === 'string' &&
                <AdminEventRegistrations eventId={props.params.id} />
        }
    </div>
}

export default AdminEventDetails
