import React from 'react'

import styles from './index.module.scss'

export interface BulletListProps {
    bullets: Array<string>
}

export const BulletList = ({ bullets, ...props }: BulletListProps) => {
    return <div className={styles.container} {...props}>
        { bullets.map(bullet => <span key={bullet}>{bullet}</span>) }
    </div>
}
