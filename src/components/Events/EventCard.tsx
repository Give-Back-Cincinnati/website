import React from 'react'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

import styles from './EventCard.module.scss'
import { Events } from '@/store/api/openApi'

export interface EventCardProps extends Events {
    opts?: {
        dateHasBorder: boolean
    }
}

export const EventCard = ({
    startTime,
    name,
    description,
    opts = { dateHasBorder: false }
}: EventCardProps) => {
    const router = useRouter()

    return <div
        className={styles.container}
        onClick={() => {
            router.push(`/events/${encodeURIComponent(name)}`)
        }}
    >
        <h3 className={`${styles.date} ${opts.dateHasBorder ? styles.dateHasBorder : ''}`}>{DateTime.fromISO(startTime || '').toLocaleString(DateTime.DATE_MED)}</h3>
        <h1 className={styles.title}>{name}</h1>
        {
            description
                ? <p className={styles.description}>{description}</p>
                : ''
        }
        
    </div>
}
