import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@/components/DataDisplay'
import { useServices } from 'hooks'
import axios from 'axios'

export default function GoogleAuthCallBack () {
    const router = useRouter()
    const Axios = useServices('Axios')
    const Toaster = useServices('Toaster')
    const query = router.query

    useEffect(() => {
        const controller = new AbortController()

        async function sendCallbackRequest (): Promise<void> {
            try {
                const response = await Axios.get('/auth/google/callback', {
                    params: query,
                    signal: controller.signal
                })
                
                if (response.status === 204) {
                    Toaster.notify({ key: Math.random().toString(), title: 'Successful Log In', intent: 'positive' })
                }
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    Toaster.notify({ key: Math.random().toString(), title: e.response?.statusText || 'Unknown Error', body: 'Please try again in a few minutes', intent: 'negative' })
                }
            } finally {
                router.push('/')
            }
        }

        sendCallbackRequest()

        return () => {
            controller.abort()
        }
    }, [ query, Axios, Toaster, router ])

    return <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ height: 50, width: 50 }}>
            <Spinner />
        </div>
    </div> 
}