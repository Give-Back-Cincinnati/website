import React from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@/components/DataDisplay'

import { useAuthGoogleCallbackQuery, AuthGoogleCallbackApiArg } from '@/store/api/openApi'

export default function GoogleAuthCallBack () {
    const router = useRouter()

    const query = router.query
    const {
        isError,
        isSuccess,
        
    } = useAuthGoogleCallbackQuery(query as AuthGoogleCallbackApiArg)

    if (isError || isSuccess) {
        router.push('/')
    }

    return <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50 }}>
            <Spinner />
        </div>
    </div> 
}