import React, { useRef, ComponentPropsWithoutRef, ChangeEventHandler, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { DateTime } from 'luxon'
import styles from './DateTimePicker.module.scss'

export interface DateTimePickerProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
    type?: string
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
    type = 'datetime-local',
    error = false,
    errorText,
    fullWidth = false,
    min = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
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

    const formattedLabel = useMemo(() => {
        return (label || name).replace(/([A-Z])/g, ' $1');
    }, [label, name])

    return <div className={containerStyles.join(' ')}>
            <animated.label
                htmlFor={name}
                style={labelStyles}
                onClick={handleLabelClick}
            >
                {formattedLabel}{props.required ? '*' : ''}
            </animated.label>
            <input
                {...props}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputEl}
                type={type}
                min={min}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
            />
            <div className={styles.errorText}>
                {errorText}
            </div>
        </div>
}