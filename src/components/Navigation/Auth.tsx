import React, { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { fetchMe } from '@/store/auth'

export const Auth = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (window) {
            const isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true'
            if (isLoggedIn) {
                dispatch(fetchMe())
            }
        }
    }, [ dispatch ])

    return <></>
}