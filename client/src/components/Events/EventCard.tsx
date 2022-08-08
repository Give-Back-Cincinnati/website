import React from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

import styles from './EventCard.module.scss'

export interface EventCardProps {
    date: string
    title: string
    description?: string
    opts?: {
        dateHasBorder: boolean
    }
}

export const EventCard = ({
    date,
    title,
    description,
    opts = { dateHasBorder: false }
}: EventCardProps) => {
    const router = useRouter()

    return <div
        className={styles.container}
        onClick={() => {
            router.push(`/events/${encodeURIComponent(title)}`)
        }}
    >
        <h3 className={`${styles.date} ${opts.dateHasBorder ? styles.dateHasBorder : ''}`}>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</h3>
        <h1 className={styles.title}>{title}</h1>
        {
            description
                ? <p className={styles.description}>{description}</p>
                : ''
        }
        
    </div>
}
