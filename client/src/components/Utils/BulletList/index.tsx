import React from 'react'

import styles from './index.module.scss'

export interface BulletListProps {
    bullets: Array<string>
    style?: Record<string, string | number>
    className?: string
}

export const BulletList = ({ bullets, ...props }: BulletListProps) => {
    return <div {...props} className={`${props.className} ${styles.container}`}>
        { bullets.map(bullet => <span key={bullet}>{bullet}</span>) }
    </div>
}
