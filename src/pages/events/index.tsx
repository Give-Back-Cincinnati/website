import React, { useMemo } from 'react'
import { NextPage } from 'next'
import styles from './index.module.scss'

import { EventHeader, EventCard } from '@/components/Events'

import type { SearchEventsApiResponse } from '@/store/api/openApi'

interface Props { 
    events: SearchEventsApiResponse
}

export const Events: NextPage<Props> = ({ events }: Props) => {

    const { eventMap, categories } = useMemo(() => {
        const eventMap: Record<string, SearchEventsApiResponse> = {}
        const categories: string[] = []

        events.forEach(event => {
            if (event.category) {
                if (eventMap[event.category]) {
                    eventMap[event.category].push(event)
                } else {
                    eventMap[event.category] = [event]
                    categories.push(event.category)
                }
            }
        })

        return { eventMap, categories: categories.sort() }
    }, [events])


    return (
        <>
            <EventHeader />

            <div className={styles.container}>
                <div className={styles.tagline}>
                    <h2>Interested in giving back, getting out, and joining the fun?</h2>

                    <p>You&apos;re in luck - with Give Back Cincinnati, there&apos;s something for everyone!  See below for our events... but keep in mind, specific event details may not be available yet</p>
                </div>

                <div className={styles.eventsContainer}>
                    { categories.length === 0 ? <div>No events currently scheduled</div> : '' }
                    {
                        categories.map(category => (
                            <div key={category}>
                                <h2>{ category }</h2>
                                {
                                    eventMap[category].map(event => <EventCard
                                        key={event._id}
                                        { ...event }
                                        opts={{ dateHasBorder: true }}
                                    />)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

Events.getInitialProps = async (): Promise<{ events: [] }> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`)
    const events = await res.json()
    return { events }
}

export default Events