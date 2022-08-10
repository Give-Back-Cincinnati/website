import React, { ComponentPropsWithoutRef, ChangeEventHandler, ChangeEvent } from 'react'
import { useSpring, animated } from '@react-spring/web'

import styles from './TextField.module.scss'
import { useEffect } from 'react'

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
    label?: string
    fullWidth?: boolean
    error?: boolean
    errorText: string
}

const withValueStyle = {
    top: '5px',
    fontSize: '12px'
}

const nullStyle = {
    top: '15px',
    fontSize: '20px'
}

export const TextField = ({
    name,
    label,
    value,
    onChange,
    error = false,
    errorText,
    fullWidth = false,
    ...props
}: TextFieldProps) => {
    const [labelStyles, api] = useSpring(() => value === '' ? nullStyle : withValueStyle)
    
    useEffect(() => {
        if (value !== '') {
            api.start(withValueStyle)
        } else {
            api.start(nullStyle)
        }
    }, [ value, api ])

    const containerStyles = [styles.container]
    if (error) containerStyles.push(styles.errorState)
    if (fullWidth) containerStyles.push(styles.fullWidth)

    return <div className={containerStyles.join(' ')}>
            <animated.label
                htmlFor={name}
                style={labelStyles}
            >
                {label}{props.required ? '*' : ''}
            </animated.label>
            <input
                {...props}
                name={name}
                value={value}
                onChange={onChange}
            />
            <div className={styles.errorText}>
                {errorText}
            </div>
        </div>
}