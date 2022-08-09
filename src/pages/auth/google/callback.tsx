import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { googleOauth20Callback } from '@/store/user'
import { fetchMe } from '@/store/user'
import { useRouter } from 'next/router'

export default function GoogleAuthCallBack () {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        const { pathname, search } = window.location
        const reconstructedUrl = `${pathname}${search}`
        dispatch(googleOauth20Callback(reconstructedUrl))
        router.push('/')
    }, [dispatch, router])

    return <div>
        <div>{ JSON.stringify(user, undefined, 2) }</div>
    </div>
}