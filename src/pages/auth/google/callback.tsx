import React, { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { googleOauth20Callback } from '@/store/auth'
import { useRouter } from 'next/router'
import { Spinner } from '@/components/DataDisplay'

export default function GoogleAuthCallBack () {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const reconstructedUrl = router.asPath
        dispatch(googleOauth20Callback(reconstructedUrl))
        router.push('/')
    }, [ dispatch, router ])

    return <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50 }}>
            <Spinner />
        </div>        
    </div> 
}