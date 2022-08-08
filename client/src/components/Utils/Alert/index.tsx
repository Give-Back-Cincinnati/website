import React, { useContext } from 'react'
import styles from './index.module.scss'

import { ServicesContext } from 'contexts/Services'
import { IToasterService } from 'services/toasterService'

import { MdInfo, MdInfoOutline, MdWarning, MdCheckCircleOutline } from 'react-icons/md'

export interface AlertProps {
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
    const { services } = useContext(ServicesContext)
    const { Toaster } = services

    return <div className={`${styles.container} ${intents[intent].style}`}>
        <div className={styles.icon}>
            { intents[intent].icon }
        </div>
        <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.body}>{body}</p>
        </div>
    </div>
}