import React, { useMemo } from 'react'

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
        <EventHeader title={name} />
    </div>
}

export default Event