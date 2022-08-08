import React from 'react'
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
    children: JSX.Element
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

    return <animated.div style={display}>
        <animated.div
            style={opacity}
            className={styles.container}
            onClick={debounce(onRequestClose, { ms: 500, leading: true })}
        />
        <animated.div style={opacity} className={styles.child}>
            { children }
        </animated.div>
    </animated.div>
}