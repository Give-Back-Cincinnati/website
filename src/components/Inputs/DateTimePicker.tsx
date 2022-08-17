import React, { useRef, ComponentPropsWithoutRef, ChangeEventHandler, MutableRefObject } from 'react'
import { useSpring, animated } from '@react-spring/web'

import styles from './DateTimePicker.module.scss'

export interface DateTimePickerProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
    label?: string
    fullWidth?: boolean
    error?: boolean
    errorText?: string
}

const withValueStyle = {
    top: '5px',
    fontSize: '12px'
}

const nullStyle = {
    top: '15px',
    fontSize: '20px'
}

export const DateTimePicker = ({
    name,
    label,
    value,
    onChange,
    error = false,
    errorText,
    fullWidth = false,
    ...props
}: DateTimePickerProps) => {
    const [labelStyles, api] = useSpring(() => value === '' ? nullStyle : withValueStyle)
    const inputEl = useRef<HTMLInputElement | null>(null)
    
    const containerStyles = [styles.container]
    if (error) containerStyles.push(styles.errorState)
    if (fullWidth) containerStyles.push(styles.fullWidth)

    function handleLabelClick () {
        inputEl.current?.focus()
    }

    function handleFocus () {
        api.start(withValueStyle)
    }

    function handleBlur () {
        value === '' && api.start(nullStyle)
    }

    return <div className={containerStyles.join(' ')}>
            <animated.label
                htmlFor={name}
                style={labelStyles}
                onClick={handleLabelClick}
            >
                {label}{props.required ? '*' : ''}
            </animated.label>
            <input
                {...props}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputEl}
                type='datetime-local'
            />
            <div className={styles.errorText}>
                {errorText}
            </div>
        </div>
}