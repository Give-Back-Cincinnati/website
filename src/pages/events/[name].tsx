import React, { useMemo, useState } from 'react'
import styles from './[name].module.scss'
import { useRouter } from "next/router"
import { EventHeader, EventDetails } from "@/components/Events"
import { HorizontalBreak } from '@/components/Backgrounds'

const html = `Back by popular demand, Give Back Cincinnati’s 2023 scavenger hunt will send teams throughout the city’s Northside, College Hill, and Clifton neighborhoods. Located just north of Over the Rhine, each of these distinct communities exude character and charm through small businesses, culture landmarks, and galleries.

The event will begin in Northside’s Jacob Hoffner Park at 12:00 p.m. on August 27. At 2:30, we’ll meet at Higher Gravity (Northside) for pints as one team relishes in victory and others are left eyeing the prize that could have been theirs if only they solved riddles faster. First drink is on us!
<ul>
<li>
12:00 p.m. Meet at Jacob Hoffner Park</li>
<li>12-2:30 p.m.: Arrive as a team or join a team for a scavenger hunt throughout Cincinnati’s Northside, College Hill, and Clifton neighborhoods.</li>
<li>2:30-3:30 p.m.: Social at Higher Gravity (Northside)</li></ul>`

export const Event = () => {
    const router = useRouter()
    const { name } = useMemo(() => {
        let { name } = router.query
        return {
            name: decodeURIComponent(name as string),
        }
    }, [ router.query ])

    return <div>
        <EventHeader title={name} category='Hands On' />
        <div className={styles.detailsContainer}>

            <EventDetails />

            <div className={styles.details} dangerouslySetInnerHTML={{ __html: html}} />

        </div>

        <HorizontalBreak>Registration</HorizontalBreak>

    </div>
}

export default Event