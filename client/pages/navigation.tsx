import Link from "next/link"
import { Pane, MenuIcon, majorScale, Text } from "evergreen-ui"
import React from "react"

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

function Navigation () {
    return (
        <Pane height={93} width='100%' is='nav' display='flex'>
            <Pane flex={1} display='flex' alignItems='center'>
                <Link href='/'>
                    <img src='/logos/half_circle.svg' width={144} height={107} alt='logo' />
                </Link>
            </Pane>
            <Pane marginRight={majorScale(4)} display='flex' justifyContent={'center'} alignItems={'center'}>
                <Pane className='xs'>
                    <MenuIcon onClick={() => alert('hello!')} size={24} color='gbc-black' />
                </Pane>
                <Pane className='sm'>
                    {
                        navigationRoutes.map(({ label, href }, idx) => (
                            <Text key={href} fontSize={majorScale(3)} fontFamily='stylized' color='gbc-red' marginRight={majorScale(idx !== navigationRoutes.length-1 ? 2: 0)}>
                                <Link href={href}>
                                    {label}
                                </Link>
                            </Text>
                        ))
                    }
                </Pane>
                <Pane className='md lg xl xxl'>
                    {
                        navigationRoutes.map(({ label, href }, idx) => (
                            <Text key={href} fontSize={majorScale(3)} fontFamily='stylized' color='gbc-red' marginRight={majorScale(idx !== navigationRoutes.length-1 ? 5: 0)}>
                                <Link href={href}>
                                    {label}
                                </Link>
                            </Text>
                        ))
                    }
                </Pane>
            </Pane>
        </Pane>
    )
}

export default Navigation
