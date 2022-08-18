import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { googleOauth20Callback } from '@/store/auth'
import { useRouter } from 'next/router'

export default function GoogleAuthCallBack () {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const auth = useAppSelector(state => state.auth)

    useEffect(() => {
        const { pathname, search } = window.location
        const reconstructedUrl = `${pathname}${search}`
        dispatch(googleOauth20Callback(reconstructedUrl))
        // router.push('/')
    }, [dispatch, router])

    return <div>
        <div>{ JSON.stringify(auth, undefined, 2) }</div>
    </div>
}