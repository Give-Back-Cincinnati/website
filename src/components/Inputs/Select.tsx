import React, { ComponentPropsWithoutRef, useMemo } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
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

    const formattedLabel = useMemo(() => {
        return (label || name).replace(/([A-Z])/g, ' $1')
    }, [label, name])

    return <div className={containerStyles.join(' ')}>
            <label htmlFor={name}>{ formattedLabel }{ props.required ? '*' : '' }</label>
            <select 
                {...props}
                value={value}
                name={name}
            >
                {
                    nullable ? <option value=''></option> : ''
                }
                {
                    options.map(({ label, _id }) => <option key={_id} value={_id}>{label || _id}</option>)
                }
            </select>
            <MdKeyboardArrowDown className={styles.downArrow} />
            <div className={styles.errorText}>
                {errorText}
            </div>
        </div>
}