import React, { ComponentPropsWithoutRef, ReactElement } from 'react'

import styles from './index.module.scss'

import { AvailableFields } from '@/components/ExperienceBuilder'

export interface HorizontalBreakProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactElement | string
}

export const HorizontalBreakFields: AvailableFields<
{ children: { type: string }}
> = {
    children: { type: 'string' }
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