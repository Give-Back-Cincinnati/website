import React, { ComponentPropsWithoutRef } from 'react'
import styles from './index.module.scss'

import { Spinner } from '@/components/DataDisplay'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    children: string
    variant?: 'default' | 'outlined'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    isLoading?: boolean
}

export const Button = ({
    children,
    variant = 'default',
    size = 'md',
    isLoading = false,
    ...props
} : ButtonProps ) => {
    const buttonStyles = [styles.base, styles[variant], styles[size]]
    let isDisabled = props.disabled

    if (isDisabled) {
        buttonStyles.push(styles.disabled)
    }

    if (isLoading) {
        isDisabled = true
        buttonStyles.push(styles.isLoading)
        buttonStyles.push(styles.disabled)
    }

    return <button className={buttonStyles.join(' ')} {...props} disabled={isDisabled}>
        {
            isLoading
                ? <Spinner color='alt' className={styles.loadingSpinner} />
                : ''
        }
        <span>
            { children.toUpperCase() }
        </span>
    </button>
}