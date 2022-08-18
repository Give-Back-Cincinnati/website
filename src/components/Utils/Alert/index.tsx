import React from 'react'
import styles from './index.module.scss'

import { MdInfo, MdInfoOutline, MdWarning, MdCheckCircleOutline } from 'react-icons/md'

export interface AlertProps {
    key: string
    title: string
    intent?: 'information' | 'positive' | 'negative' | 'warning'
    body?: string
}

const intents = {
    information: {
        style: styles.information,
        icon: <MdInfoOutline />,
    },
    positive: {
        style: styles.positive,
        icon: <MdCheckCircleOutline />,
    },
    negative: {
        style: styles.negative,
        icon: <MdInfo />,
    },
    warning: {
        style: styles.warning,
        icon: <MdWarning />,
    },
}

export const Alert = ({ title, body, intent = 'information' }: AlertProps) => {
    return <div className={styles.background}>
        <div className={`${styles.container} ${intents[intent].style}`}>
            <div className={styles.icon}>
                { intents[intent].icon }
            </div>
            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.body}>{body}</p>
            </div>
        </div>
    </div>
}