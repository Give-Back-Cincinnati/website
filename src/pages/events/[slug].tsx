import React, { useEffect, useMemo } from 'react'
import styles from './[slug].module.scss'
import { EventHeader, EventDetails, Waiver } from "@/components/Events"
import { HorizontalBreak } from '@/components/Backgrounds'
import { DynamicForm } from '@/components/DynamicForm'
import { Spinner, Notify } from '@/components/DataDisplay'
import { Alert } from '@/components/Utils'
import { Events, useGetMeQuery, usePostEventsByEventIdRegisterMutation, GuestRegistration } from '@/store/api/openApi'
import { useGetSchema } from 'hooks'

export async function getStaticPaths () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events?endTime%5B%24gt%5D=${new Date().toLocaleDateString()}`)
    const events: Events[] = await res.json()
    const mapped = events.map(event => ({ params: { slug: event.slug } }))
    return {
        paths: mapped,
        fallback: false
    }
}

export async function getStaticProps (context: { params: Events }): Promise<{ props: { event: Events } }> {
    const params = new URLSearchParams({ slug: context.params.slug || '' }).toString()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params}`)
    const event: Events[] = await res.json()
    return {
        props: { event: event[0] }
    }
}

export const Event = ({ event }: { event: Events }) => {
    const userRegistrationSchema = useGetSchema('UserRegistration')
    const guestRegistrationSchema = useGetSchema('GuestRegistration')
    const { data: me } = useGetMeQuery()

    const [submitRegistration, { status, error, reset, isSuccess }] = usePostEventsByEventIdRegisterMutation()

    function handleRegistrationSubmit (itm: Record<string, unknown>) {
        submitRegistration({
            eventId: event._id,
            body: itm as GuestRegistration
        })
    }

    useEffect(() => {

        if (status === 'fulfilled') {
            Notify({ title: 'Successfully Registered!', intent: 'positive'})
        }

        if (error) {
            reset()
        }
    }, [reset, error, status])

    const registrationSchema = useMemo(() => {
        const schema = me ? userRegistrationSchema : guestRegistrationSchema
        if (!schema) return schema

        if (Object.keys(event.customFields || {}).length > 0) {
            Object.entries(event.customFields || {}).forEach(([key, value]) => {
                if (value.isRequired) {
                    schema.required.push(key)
                }
            })
            schema.properties = {
                ...schema.properties,
                ...event.customFields
            }
        }

        return schema
    }, [ userRegistrationSchema, guestRegistrationSchema, me, event ])


    return <div>
        <EventHeader title={event.name} category={event.category} />
        <div className={styles.detailsContainer}>

            <EventDetails startTime={event.startTime} endTime={event.endTime} address={event.address} />

            <div className={styles.details} dangerouslySetInnerHTML={{ __html: event.description }} />

        </div>

        <HorizontalBreak>Registration</HorizontalBreak>

        {
            isSuccess &&
            <Alert key="registrationSuccess" title="You have successfully registered for this event" intent="positive" />
        }

        {
            registrationSchema && !isSuccess
                ? <DynamicForm
                    entity={registrationSchema}
                    onSubmit={handleRegistrationSubmit}
                    values={me} // if we add new fields in the future, autopopulate them for logged in users
                    hiddenFields={['user']}
                    labelOverrides={{
                        hasAgreedToTerms: (_) => <Waiver />
                    }}
                    isLoading={status === 'pending'}
                />
                : ''
        }
        {
            !guestRegistrationSchema || !userRegistrationSchema
                ? <Spinner />
                : ''
        }

    </div>
}



export default Event