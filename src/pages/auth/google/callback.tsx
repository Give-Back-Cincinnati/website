import React from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@/components/DataDisplay'

import { useGoogleOauthCallBackQuery } from '@/store/api/apiSlice'

export default function GoogleAuthCallBack () {
    const router = useRouter()

    const reconstructedUrl = router.asPath
    const {
        isError,
        isLoading,
        isSuccess,
        data,
    } = useGoogleOauthCallBackQuery(reconstructedUrl)

    router.push('/')

    return <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50 }}>
            <Spinner />
        </div>
        <div>
            { JSON.stringify({ data, isError, isLoading, isSuccess }) }
        </div>
    </div> 
}