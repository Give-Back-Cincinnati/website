import { ComponentPropsWithoutRef, ChangeEventHandler, ChangeEvent } from 'react'
import { useFormatInputLabel } from 'hooks'
import styles from './CheckBox.module.scss'

import CSCheckBox, { CheckboxProps } from '@cloudscape-design/components/checkbox'
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events'

export interface CheckBoxProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    checked: boolean
    onChange: ChangeEventHandler
    label?: string | JSX.Element
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

    const formattedLabel = useFormatInputLabel({ label, name })

    const handleChange: NonCancelableEventHandler<CheckboxProps.ChangeDetail> = (e) => {
        props.onChange({
            target: {
                name,
                type: 'checkbox',
                checked: e.detail.checked
            }
        } as unknown as ChangeEvent<HTMLInputElement>)
    }

    return <div className={styles.container}>
        <CSCheckBox
            checked={props.checked}
            onChange={handleChange}
            disabled={props.disabled}
        >
            <label>
                { formattedLabel }
            </label>
        </CSCheckBox>
        <div className={styles.errorText}>
            {errorText}
        </div>
    </div>
}