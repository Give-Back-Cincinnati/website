import React, { useMemo, useState } from 'react'
import styles from './[name].module.scss'
import { EventHeader, EventDetails } from "@/components/Events"
import { HorizontalBreak } from '@/components/Backgrounds'
import { Events } from '@/store/api/openApi'

export async function getStaticPaths () {
    // Add $gt endTime filter once the server can handle it
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`)
    const events: Events[] = await res.json()
    const mapped = events.map(event => ({ params: event }))
    return {
        paths: mapped,
        fallback: false
    }
}

export async function getStaticProps (context: { params: Events }) {
    const params = new URLSearchParams({ name: context.params.name }).toString()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params}`)
    const event: Events[] = await res.json()

    return {
        props: { event: event[0] }
    }
}

export const Event = ({ event }: { event: Events }) => {
    return <div>
        <EventHeader title={event.name} category='Hands On' />
        <div className={styles.detailsContainer}>

            <div>
                { JSON.stringify(event) }
            </div>

            <EventDetails />

            <div className={styles.details} dangerouslySetInnerHTML={{ __html: event.description }} />

        </div>

        <HorizontalBreak>Registration</HorizontalBreak>

    </div>
}



export default Event