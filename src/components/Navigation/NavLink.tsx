import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Paper } from '@/components/Utils'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { animated, useSpring } from '@react-spring/web'

import styles from './NavLink.module.scss'

type navigationLocation = {
    label: string
    href: string | Function
}

export type NavLinkProps = {
    label: string
    href?: string | Function
    childRoutes?: navigationLocation[]
}

export const NavLink = ({ label, href, childRoutes }: NavLinkProps) => {
    const [ isOpen, setOpen ] = useState(false)
    const router = useRouter()

    const containerClasses = useMemo(() => {
        const classes = [styles.container]
        if (href) classes.push(styles.navigationLinks)
        return classes.join(' ')
    }, [ href ])

    const showOptionsAnimationStyles = useSpring(({
        transform: isOpen ? 'translateY(0%) scaleY(1)' : 'translateY(-35%) scaleY(0)'
    }))

    const arrowAnimationStyles = useSpring({
        transform: isOpen ? 'scaleY(1)' : 'scaleY(-1)'
    })

    function toggleOpen () {
        setOpen(!isOpen)
    }

    return <>
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div
            className={containerClasses}
            onClick={() => {
                if (href && typeof href === 'string') void router.push(href)
                if (href && typeof href === 'function') void href()
                toggleOpen()
            }}
        >
            <span
                className={styles.navigationLinks}
            >
                { label } { childRoutes && <animated.div style={arrowAnimationStyles}><MdKeyboardArrowDown /></animated.div> }
            </span>
        </div>
        {
            childRoutes && <animated.div style={showOptionsAnimationStyles} className={styles.childrenContainer}>
                <Paper elevation={6} padding='.5rem'>
                    <div onClick={toggleOpen}>
                        {
                            childRoutes.map((args) => <NavLink key={args.label} {...args} />)
                        }
                    </div>
                </Paper>
            </animated.div>
        }
    </div>
    </>
}
