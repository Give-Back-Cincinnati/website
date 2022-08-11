import React, { ComponentPropsWithoutRef } from 'react'
import { useSpring, animated } from '@react-spring/web'


import styles from './Select.module.scss'

export interface SelectOptions {
    _id: string
    label?: string
}

export interface SelectProps extends ComponentPropsWithoutRef<'select'> {
    name: string
    options: SelectOptions[]
    value: string
    label?: string
    nullable?: boolean,
    fullWidth?: boolean
    error?: boolean
    errorText?: string
}

export const Select = ({
    name,
    options,
    value,
    label = '',
    nullable = false,
    fullWidth = false,
    error = false,
    errorText,
    ...props
}: SelectProps) => {
    const containerStyles = [styles.container]
    if (error) containerStyles.push(styles.errorState)
    if (fullWidth) containerStyles.push(styles.fullWidth)

    return <div className={containerStyles.join(' ')}>
            <label htmlFor={name}>{ label }{ props.required ? '*' : '' }</label>
            <select 
                {...props}
                name={name}
            >
                {
                    nullable ? <option value=''></option> : ''
                }
                {
                    options.map(({ label, _id }) => <option key={_id} value={_id}>{label || _id}</option>)
                }
            </select>
            <div className={styles.errorText}>
                {errorText}
            </div>
        </div>
}