import Link from "next/link"
import { useRouter } from 'next/router'
import {Pane, MenuIcon, majorScale, minorScale, Text, Overlay, Button} from "evergreen-ui"
import React, { useState } from "react"

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

const navProps = {
    fontSize: majorScale(3),
    fontFamily:'stylized',
    color:'gbc-red',
}

function Navigation () {
    const router = useRouter()
    const [ isNavigationOpen, setNavigationOpen ] = useState(false)

    return (
        <Pane height={93} width='100%' is='nav' display='flex' zIndex={19}>
            <Pane flex={1} display='flex' alignItems='center'>
                <img
                    src='/logos/half_circle.svg'
                    width={144}
                    height={107}
                    alt='logo'
                    style={{ cursor: 'pointer' }}
                    onClick={() => void router.push('/')}
                />
            </Pane>
            <Pane marginRight={majorScale(4)} display='flex' justifyContent={'center'} alignItems={'center'}>
                <Pane className='xs'>
                    <MenuIcon onClick={() => setNavigationOpen(true)} size={24} color='gbc-black' />
                </Pane>
                <Pane className='sm'>
                    {
                        navigationRoutes.map(({ label, href }, idx) => (
                            <Text
                                key={href}
                                marginRight={majorScale(idx !== navigationRoutes.length-1 ? 2: 0)}
                                onClick={() => {
                                    void router.push(href)
                                }}
                                {...navProps}
                            >
                                {label}
                            </Text>
                        ))
                    }
                </Pane>
                <Pane className='md lg xl xxl'>
                    {
                        navigationRoutes.map(({ label, href }, idx) => (
                            <Text
                                key={href}
                                marginRight={majorScale(idx !== navigationRoutes.length-1 ? 5: 0)}
                                onClick={() => {
                                    void router.push(href)
                                }}
                                {...navProps}
                            >
                                {label}
                            </Text>
                        ))
                    }
                </Pane>
            </Pane>
            <Overlay
                isShown={isNavigationOpen}
                onExited={() => setNavigationOpen(false)}
            >
                <Pane
                    position='fixed'
                    width={250}
                    height='100vh'
                    right={0}
                    backgroundColor='#FFF'
                    display={isNavigationOpen ? 'block' : 'none'}
                >
                    <Pane background='gbc-red' height={93} width='100%'>
                        <span onClick={() => setNavigationOpen(false)}>X</span>
                    </Pane>
                    {navigationRoutes.map(({ label, href }, idx) => (
                        <Text
                            key={href}
                            width='100%'
                            is='div'
                            paddingY={majorScale(2)}
                            paddingLeft={majorScale(2)}
                            onClick={() => {
                                setNavigationOpen(false)
                                void router.push(href)
                            }}
                        >
                            {label}
                        </Text>
                    ))}
                </Pane>
            </Overlay>
        </Pane>
    )
}

export default Navigation
