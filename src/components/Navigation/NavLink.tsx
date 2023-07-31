import React, { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Paper } from '@/components/Utils'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { animated, useSpring, config } from '@react-spring/web'

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
    const parentNav = useRef<HTMLDivElement | null>(null)
    const router = useRouter()

    const containerClasses = useMemo(() => {
        const classes = [styles.container]
        if (href) classes.push(styles.navigationLinks)
        return classes.join(' ')
    }, [ href ])

    const calculatedChildRouteStyles = (() => {
        if (parentNav.current) {
            const box = parentNav.current.getBoundingClientRect()
            return {
                top: box.y + box.height
            }
        }
        return {}
    })()

    const showOptionsAnimationStyles = useSpring(({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0%) scaleY(1)' : 'translateY(-45%) scaleY(0)',
        ...calculatedChildRouteStyles,
        config: config.stiff
    }))

    const arrowAnimationStyles = useSpring({
        transform: isOpen ? 'scaleY(1)' : 'scaleY(-1)',
        top: isOpen ? 5 : 0,
        config: config.stiff
    })

    function toggleOpen () {
        setOpen(!isOpen)
    }

    return <>
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div
            ref={parentNav}
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
                { label } { childRoutes && <animated.div style={arrowAnimationStyles} className={styles.keyboardArrow}><MdKeyboardArrowDown /></animated.div> }
            </span>
        </div>
        {
            childRoutes && <animated.div style={showOptionsAnimationStyles} className={styles.childrenContainer}>
                <Paper elevation={6} padding='.5rem' className={styles.paperContainer}>
                    <div onClick={toggleOpen} style={calculatedChildRouteStyles}>
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
