import React, { useState, useMemo } from "react"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Overlay } from '@/components/Utils'
import { Avatar } from "components/DataDisplay"
import { NavLink, NavLinkProps } from "./NavLink"

import { MdOutlineMenu } from 'react-icons/md'
import styles from './index.module.scss'

import { useGetMeQuery } from "@/store/api/openApi"
import type { Permissions } from "@/store/api/openApi"

export const Navigation = () => {
    const router = useRouter()
    const [ isNavigationOpen, setNavigationOpen ] = useState(false)
    
    const {
        data: user
    } = useGetMeQuery()
    
    // a user is considered an admin if they can post an event
    const isAdmin = useMemo(() => {
        let createEventPermissionFound = false
        if (user && user.role && user.role.permissions) {
            user.role.permissions.forEach((permission: Permissions) => {
                if (permission.name === 'events.post') {
                    createEventPermissionFound = true
                }
            })
        }
        return createEventPermissionFound
    }, [user])

    const navigationRoutes: NavLinkProps[] = [
        {
            label: 'Upcoming Events',
            href: '/events',
        },
        {
            label: 'Our Programs',
            childRoutes: [
                // { label: 'Cincy YP', href: '/cincy-yp' },
                { label: 'Fall Feast', href: '/fall-feast' },
                { label: 'Fuel Cincinnati', href: '/fuel-cincinnati' },
                // { label: 'Give Back Beyond Cincinnati', href: '/give-back-beyond' },
                { label: 'Paint the Town', href: '/paint-the-town' },
            ]
        },
        // {
        //     label: 'Join GBC',
        //     href: '/about-us2',
        // },
        // {
        //     label: 'Support GBC',
        //     href: '/about-us3',
        // },
    ]

    if (isAdmin) {
        navigationRoutes.push({
            label: 'Admin',
            href: '/admin'
        })
    }
    
    if (!isAdmin) {
        navigationRoutes.push({
            label: 'Donate',
            href: 'https://secure.givelively.org/donate/give-back-cincinnati'
        })
    }

    if (!user) {
        navigationRoutes.push({
            label: 'Login',
            href: () => {
                void router.push('https://accounts.google.com/o/oauth2/v2/auth'
                + '?response_type=code'
                + `&redirect_uri=${encodeURIComponent(window.location.origin)}%2Fauth%2Fgoogle%2Fcallback`
                + '&scope=profile%20email'
                + `&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`)
        }})
    }

    return (
        <nav
            className={styles.nav}
        >
            <div className={styles.logo}>
                <Image
                    src='/logos/half_circle.svg'
                    width={144}
                    height={93}
                    alt='logo'
                    onClick={() => void router.push('/')}
                />
            </div>
            <div className={styles.navigationLinks}>
                <div className={styles.navBarHorizontalContainer}>
                    {
                        navigationRoutes.map(props => (
                            <NavLink key={props.label} {...props} />
                        ))
                    }
                </div>
                
                {
                    user
                    ? <Avatar
                        name={user.firstName || ''}
                        src={user.profilePicture}
                    />
                    : ''
                }
                <MdOutlineMenu className={styles.menuIcon} onClick={() => setNavigationOpen(true)} />
            </div>

            <Overlay
                isOpen={isNavigationOpen}
                onRequestClose={() => setNavigationOpen(false)}
            >
                <aside>
                    <header>
                        <span onClick={() => setNavigationOpen(false)}>X</span>
                    </header>
                    {navigationRoutes.map(({ label, href, childRoutes }, idx) => (
                        <div
                            key={label}
                            onClick={() => {
                                if (href) {
                                    setNavigationOpen(false)
                                    if (typeof href === 'string') void router.push(href)
                                    if (typeof href === 'function') href()
                                }
                            }}
                        >
                            {label}
                            {childRoutes?.map(({ label, href }) => (
                                <div
                                    key={label}
                                    onClick={() => {
                                        if (href) {
                                            setNavigationOpen(false)
                                            if (typeof href === 'string') void router.push(href)
                                            if (typeof href === 'function') href()
                                        }
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    ))}
                </aside>
            </Overlay>
        </nav>
    )
}

export default Navigation