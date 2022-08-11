import React, { ComponentPropsWithoutRef } from 'react'

import styles from './index.module.scss'

export interface HorizontalBreakProps extends ComponentPropsWithoutRef<'div'> {
    children: string
}

export const HorizontalBreak = ({ children, ...props }: HorizontalBreakProps) => {
    return <div {...props} className={styles.container}>
        <div className={styles.circleContainer}>
            <span />
            <span />
            <span />
        </div>
        <div className={styles.title}>
            { children }
        </div>
        <div className={styles.circle} />
        <div className={styles.line} />
    </div>
}