import { useMemo } from 'react'
import { Table } from '@/components/DataDisplay'
import { CheckIn } from './CheckIn'
import { Delete } from './Delete'
import {
    useSearchUsersQuery,
    useGetEventsByEventIdRegisterQuery,
    Users
} from "@/store/api/openApi"
import { CheckBox } from '@/components/Inputs'
import { Button } from '@/components/Utils'
import { DateTime } from 'luxon'

export type AdminEventRegistrationsProps = {
    eventId: string
}

export const AdminEventRegistrations = ({ eventId }: AdminEventRegistrationsProps) => {
    const { data: users } = useSearchUsersQuery({ limit: 0 }) // limit 0 will return all users
    const { data: eventRegistrations } = useGetEventsByEventIdRegisterQuery({ eventId, limit: 0 })

    const formattedUsers = useMemo(() => {
        if (!users) return {}
        return users.reduce((acc: Record<string, Users>, user: Users) => {
            if (user._id) {
                acc[user._id] = user
            }
            return acc
        }, {})
    }, [users])

    const formattedEventRegistrations = useMemo(() => {
        if (!eventRegistrations) return []

        return eventRegistrations.map(registration => {
            let user: {} | Users = {}
            if ('user' in registration && typeof registration.user === 'string') {
                user = formattedUsers[registration.user]
            }

            return {
                ...registration,
                ...user,
                hasAgreedToTerms: <CheckBox name='' label={registration.hasAgreedToTerms.toString()} checked={registration.hasAgreedToTerms} disabled onChange={() => {}} />,
                checkedIn: <CheckIn eventId={eventId} registration={registration} />,
                delete: <Delete eventId={eventId} registration={registration} />
            }
        })
    }, [eventRegistrations, formattedUsers, eventId])

    const emailList = useMemo(() => {
        return formattedEventRegistrations
            .map(registration => registration.email)
            .join()
    }, [ formattedEventRegistrations ])

    return <div>
    <h2>Registrations: {eventRegistrations?.length || 0}</h2>
    {
        eventRegistrations &&
        <>
            <a href={`mailto:?bcc=${emailList}`}>
                <Button
                    variant='outlined'
                >
                    Email All Registrations
                </Button>
            </a>
            <Table
                keys={['firstName', 'lastName', 'phone', 'email', 'dateOfBirth', 'hasAgreedToTerms', 'customFields', 'checkedIn', 'delete']}
                data={formattedEventRegistrations}
                formatFunctions={{
                    dateOfBirth: (val) => DateTime.fromISO(val).toLocaleString(DateTime.DATE_SHORT),
                    customFields: (val) => Object.values(val).join(', ')
                }}
            />
        </>
    }
</div>
}