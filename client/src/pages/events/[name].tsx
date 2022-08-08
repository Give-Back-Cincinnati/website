import React, { useMemo } from 'react'
import styles from './[name].module.scss'
import { useRouter } from "next/router"
import { EventHeader } from "@/components/Events"

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
        <div className={styles.eventContainer}>
            Event Container
        </div>
    </div>
}

export default Event