import { ComponentPropsWithoutRef } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"

import styles from './CheckBox.module.scss'

export interface CheckBoxProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    value: string
    label?: string
    fullWidth?: boolean
    error?: boolean
    errorText?: string
}

export const CheckBox = ({
    name,
    value,
    label = '',
    fullWidth = false,
    error = false,
    errorText,
    ...props
}: CheckBoxProps) => {
    const containerStyles = [styles.container]
    if (error) containerStyles.push(styles.errorState)
    if (fullWidth) containerStyles.push(styles.fullWidth)

    return <div className={styles.container}>
        <input type='checkbox' id={name} name={name} {...props} />
        <label htmlFor={name}>
            { label }{ props.required ? '*' : '' }
        </label>
        <div className={styles.errorText}>
            {errorText}
        </div>
    </div>
}