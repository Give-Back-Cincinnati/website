import { useRef } from 'react'
import { Alert, AlertProps } from '@/components/Utils'
import { useAppSelector } from '@/store/hooks'
import styles from './Toaster.module.scss'

import { animated, useSpring, config } from '@react-spring/web'

const AlertWrapper = (alertProps: AlertProps) => {
    const alertEl = useRef<HTMLDivElement | null>(null)

    const fadeIn = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: config.slow
    })

    return <animated.div style={fadeIn} ref={alertEl}>            
        <Alert
            {...alertProps}
        />
    </animated.div>
}

export const Toaster = () => {
    const { notifications } = useAppSelector(state => state.toaster)

    return <div className={styles.container}>
        {
            notifications.map(({key, ...alertProps}) => <AlertWrapper key={key} {...alertProps} />)
        }
    </div>
}
