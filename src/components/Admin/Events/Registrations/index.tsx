import { useMemo, useEffect } from 'react'
import { Button } from '@/components/Utils'
import { Table } from '@/components/DataDisplay'
import { CheckIn } from './CheckIn'
import { Delete } from './Delete'
import {
    useGetEventsByEventIdRegisterQuery, useUpdateRegistrationMutation, useDeleteRegistrationMutation } from "@/store/api/openApi"

export type AdminEventRegistrationsProps = {
    eventId: string
}

export const AdminEventRegistrations = ({ eventId }: AdminEventRegistrationsProps) => {
    const { data: eventRegistrations } = useGetEventsByEventIdRegisterQuery({ eventId })

    const formattedEventRegistrations = useMemo(() => {
        if (!eventRegistrations) return []

        return eventRegistrations.map(registration => {
            return {
                ...registration,
                checkedIn: <CheckIn eventId={eventId} registration={registration} />,
                delete: <Delete eventId={eventId} registration={registration} />
            }
        })
    }, [eventRegistrations, eventId])

    return <div>
    <h2>Registrations: {eventRegistrations?.length || 0}</h2>
    {
        eventRegistrations &&
        <Table
            keys={['firstName', 'lastName', 'phone', 'email', 'dateOfBirth', 'checkedIn', 'hasAgreedToTerms', 'delete']}
            data={formattedEventRegistrations}
        />
    }
</div>
}