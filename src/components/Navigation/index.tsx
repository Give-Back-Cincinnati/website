import React, { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Overlay } from '../Utils'

import { MdOutlineMenu } from 'react-icons/md'
import Logo from '../../../public/logos/half_circle.svg'
import styles from './index.module.scss'

import { useAppSelector } from "@/store/hooks"

const navigationRoutes = [
    // {
    //     label: 'About Us',
    //     href: '/about-us',
    // },
    {
        label: 'Upcoming Events',
        href: '/events',
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

export const Navigation = () => {
    const router = useRouter()
    const [ isNavigationOpen, setNavigationOpen ] = useState(false)
    const user = useAppSelector(state => state.user)

    return (
        <nav
            className={styles.nav}
        >
            <div className={styles.logo}>
                <Image
                    src={Logo}
                    width={144}
                    height={107}
                    alt='logo'
                    onClick={() => void router.push('/')}
                />
            </div>
            <div className={styles.navigationLinks}>
                <div className='xs'>
                    <MdOutlineMenu className={styles.menuIcon} onClick={() => setNavigationOpen(true)} />
                </div>
                <div className='sm md lg xl xxl'>
                    {
                        navigationRoutes.map(({ label, href }, idx) => (
                            <span
                                key={href}
                                onClick={() => {
                                    void router.push(href)
                                }}
                                className={styles.navBarHorizontal}
                            >
                                { label }
                            </span>
                        ))
                    }
                    <span
                        className={styles.navBarHorizontal}
                        onClick={() => {
                            void router.push('https://accounts.google.com/o/oauth2/v2/auth'
                            + '?response_type=code'
                            + `&redirect_uri=${encodeURIComponent(window.location.origin)}%2Fauth%2Fgoogle%2Fcallback`
                            + '&scope=profile%20email'
                            + `&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`)
                        }}
                    >
                        Login
                    </span>
                </div>
            </div>
            <Overlay
                isOpen={isNavigationOpen}
                onRequestClose={() => setNavigationOpen(false)}
            >
                <aside>
                    <header>
                        <span onClick={() => setNavigationOpen(false)}>X</span>
                    </header>
                    {navigationRoutes.map(({ label, href }, idx) => (
                        <div
                            key={href}
                            onClick={() => {
                                setNavigationOpen(false)
                                void router.push(href)
                            }}
                        >
                            {label}
                        </div>
                    ))}
                    <div
                        onClick={() => {
                            setNavigationOpen(false)
                            void router.push('https://accounts.google.com/o/oauth2/v2/auth'
                            + '?response_type=code'
                            + `&redirect_uri=${encodeURIComponent(window.location.origin)}%2Fauth%2Fgoogle%2Fcallback`
                            + '&scope=profile%20email'
                            + `&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`)
                        }}
                    >
                        Login
                    </div>
                </aside>
            </Overlay>
            <div>
                { JSON.stringify(user) }
            </div>
        </nav>
    )
}

export default Navigation