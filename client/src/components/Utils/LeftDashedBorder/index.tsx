import React from 'react'

import styles from './index.module.scss'

export interface LeftDashedBorderProps {
    children: JSX.Element,
    topOffset?: number
}

export const LeftDashedBorder = ({ children, topOffset = 0 }: LeftDashedBorderProps) => {
    return <div className={styles.container}>
        <div className={styles.innerContainer}>
            <div className={styles.accentCircle} style={{ top: (42 + topOffset).toString() + 'px' }} />
            { children }
        </div>
    </div>
}