import { useMemo, ComponentPropsWithoutRef, ChangeEventHandler } from 'react'
import { DateTime } from 'luxon'
import styles from './CheckBox.module.scss'

export interface CheckBoxProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    checked: boolean
    onChange: ChangeEventHandler
    label?: string
    fullWidth?: boolean
    error?: boolean
    errorText?: string
}

export const CheckBox = ({
    name,
    label = '',
    fullWidth = false,
    error = false,
    errorText,
    ...props
}: CheckBoxProps) => {
    const containerStyles = [styles.container]
    if (error) containerStyles.push(styles.errorState)
    if (fullWidth) containerStyles.push(styles.fullWidth)

    const formattedLabel = useMemo(() => {
        return (label || name).replace(/([A-Z])/g, ' $1');
    }, [label, name])

    return <div className={styles.container}>
        <label htmlFor={name}>
            <input type='checkbox' id={name} name={name} {...props} />
            { formattedLabel }{ props.required ? '*' : '' }
        </label>
        <div className={styles.errorText}>
            {errorText}
        </div>
    </div>
}