import React, { useState } from "react"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Overlay } from '../Utils'

import { MdOutlineMenu } from 'react-icons/md'
import Logo from '../../../public/logos/half_circle.svg'
import styles from './index.module.scss'

import { useAppDispatch } from "store/hooks"
import { login } from "store/user"

const navigationRoutes = [
    {
        label: 'About Us',
        href: '/about-us',
    },
    {
        label: 'Upcoming Events',
        href: '/about-us1',
    },
    {
        label: 'Join GBC',
        href: '/about-us2',
    },
    {
        label: 'Support GBC',
        href: '/about-us3',
    },
]

export const Navigation = () => {
    const router = useRouter()
    const [ isNavigationOpen, setNavigationOpen ] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <nav
            className={styles.nav}
            onClick={() => {
                console.log('hello world')
                dispatch(login({ email: 'michael', password: 'onyx' }))
            }}
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
                </aside>
            </Overlay>
        </nav>
    )
}

export default Navigation