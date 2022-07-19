import React from 'react'
import styles from './index.module.scss'

export interface ButtonProps {
    children: string
    variant?: 'default' | 'outlined'
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Button = ({ children, variant = 'default', size = 'md', ...props } : ButtonProps ) => {
    return <button className={`${styles.base} ${styles[variant]} ${styles[size]}`} {...props}>
        <span>
            { children.toUpperCase() }
        </span>
    </button>
}