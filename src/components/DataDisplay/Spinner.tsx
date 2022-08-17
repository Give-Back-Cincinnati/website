import React, { ComponentPropsWithoutRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import styles from './Spinner.module.scss'

export interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
    color?: 'information' | 'positive' | 'negative' | 'warning' | 'alt' | 'primary'
}

export const Spinner = ({ color = 'primary', ...props }: SpinnerProps) => {
    const animationStyles = useSpring({
        loop: { reverse: true },
        to: {
            strokeDashoffset: 130,
        },
        from: {
            strokeDashoffset: 5,
        },
        config: { duration: 1250 }
    })
    const rotationStyles = useSpring({
        loop: true,
        reset: true,
        to: { rotate: 361 },
        from: { rotate: 0 },
        config: {
            duration: 1000
        }
    })

    const colorClass: Record<string, string> = {
        primary: styles.primary,
        alt: styles.alt,
        warning: styles.warning,
        positive: styles.positive,
        negative: styles.negative,
        information: styles.information
    }

    const containerStyles = [styles.container]

    if (props.className) {
        containerStyles.push(props.className)
    }

    return <div className={containerStyles.join(' ')}>
        <animated.svg viewBox="-25 -25 50 50" width='100%' height='100%' style={rotationStyles}>
            <animated.circle
                r={22}
                fillOpacity={0}
                strokeWidth={4}
                strokeLinecap='round'
                style={animationStyles}
                strokeDasharray={Math.PI * 2 * 22}
                className={colorClass[color]}
            />
        </animated.svg>
    </div>
}