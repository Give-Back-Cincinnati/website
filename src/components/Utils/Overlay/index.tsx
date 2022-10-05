import React, { ReactElement, useEffect } from 'react'
import styles from './overlay.module.scss'
import { debounce } from '../../../utils'

import {
    useSpring,
    useChain,
    animated,
    useSpringRef,
    config
} from '@react-spring/web'

export interface OverlayProps {
    isOpen: boolean
    configPreset?: 'default' | 'gentle' | 'wobbly' | 'stiff' | 'slow' | 'molasses'
    onRequestClose: Function
    children: ReactElement
}

export const Overlay = ({
    isOpen = false,
    configPreset = 'default',
    onRequestClose,
    children, 
    ...props
}: OverlayProps) => {

    const opacityApi = useSpringRef()
    const opacity = useSpring({
        ref: opacityApi,
        config: config[configPreset],
        opacity: isOpen ? 1 : 0
    })

    const displayApi = useSpringRef()
    const display = useSpring({
        ref: displayApi,
        config: config[configPreset],
        display: isOpen ? 'block' : 'none'
    })

    useChain(
        isOpen ? [displayApi, opacityApi] : [ opacityApi, displayApi ],
        isOpen ? [.1, 0] : [0, 0.4]
    )

/**
*   Prevent the body from scrolling when overlay isOpen
*/ 
    useEffect(() => {
        let bodyClasses = document.body.className
        if (isOpen) {
            bodyClasses += styles.noScroll
        } else {
            bodyClasses.replace(styles.noScroll, '')
        }
        document.body.className = bodyClasses

        return () => {
            // make sure to remove the no scroll class from body on unmount, regardless of render status
            bodyClasses = bodyClasses.replace(styles.noScroll, '')
            document.body.className = bodyClasses
        }
    }, [isOpen])

    return <animated.div style={display} className={styles.container}>
        <animated.div
            style={opacity}
            className={styles.overlay}
            onClick={debounce(onRequestClose, { ms: 500, leading: true })}
        />
        <animated.div style={opacity} className={styles.child}>
            { children }
        </animated.div>
    </animated.div>
}