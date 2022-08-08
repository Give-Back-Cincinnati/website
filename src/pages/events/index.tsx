import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.scss'

import { EventHeader, EventCard } from '@/components/Events'

const upcomingEvents = [
    {
        _id: '1',
        date: '2022-08-03T04:00:00.000Z',
        title: 'First Event with a much much longer title',
        description: 'short description about the event... like a single sentence',
        category: 'Social'
    },
    {
        _id: '2',
        date: '2022-08-03T04:00:00.000Z',
        title: 'Second Event',
        description: 'short description about the event... like a single sentence',
        category: 'Hands On'
    },
    {
        _id: '3',
        date: '2022-08-03T04:00:00.000Z',
        title: 'First Event',
        description: 'short description about the event... like a single sentence',
        category: 'Interactive'
    },
    {
        _id: '4',
        date: '2022-08-03T04:00:00.000Z',
        title: 'First Event',
        description: 'short description about the event... like a single sentence',
        category: 'Fuel Cincinnati'
    },
    {
        _id: '5',
        date: '2022-08-03T04:00:00.000Z',
        title: 'First Event',
        description: 'short description about the event... like a single sentence',
        category: 'Civic Engagement'
    },
    {
        _id: '6',
        date: '2022-08-03T04:00:00.000Z',
        title: 'First Event',
        description: 'short description about the event... like a single sentence',
        category: 'Hands On'
    },
]

interface Event {
    _id: string
    date: string
    title: string
    description: string
    category: string
}

export const Events = () => {
    const router = useRouter()

    const { events, categories } = useMemo(() => {
        const eventMap: Record<string, Event[]> = {}
        const categories: string[] = []

        upcomingEvents.forEach(event => {
            if (eventMap[event.category]) {
                eventMap[event.category].push(event)
            } else {
                eventMap[event.category] = [event]
                categories.push(event.category)
            }
        })

        return { events: eventMap, categories: categories.sort() }
    }, [])


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
                                    events[category].map(event => <EventCard
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

export default Events