import React, { ChangeEvent, ComponentPropsWithoutRef, ChangeEventHandler, useMemo } from 'react'
import { useFormatInputLabel } from 'hooks'

import { Input, FormField, InputProps } from '@cloudscape-design/components'

import styles from './TextField.module.scss'
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events'

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string
    label?: string | JSX.Element
    fullWidth?: boolean
    error?: boolean
    errorText?: string
    pattern?: string
}

export const TextField = ({
    name,
    label,
    value,
    onChange,
    error = false,
    errorText,
    fullWidth = false,
    pattern,
    ...props
}: TextFieldProps) => {
    const formattedLabel = useFormatInputLabel({ label, name })

    const isValid = useMemo(() => {
        if (value === '') return true

        if (pattern && new RegExp(pattern).test(value) === false) {
            return false
        }

        return true
    }, [value, pattern])

    if (error || !isValid) {
        if (!isValid && !errorText) {
            errorText = `Invalid ${formattedLabel} format`
        }
    }

    const handleChange: NonCancelableEventHandler<InputProps.ChangeDetail> = (e) => {
        onChange({
            target: {
                name,
                value: e.detail.value
            }
        } as unknown as ChangeEvent<HTMLInputElement>)
    }

    const formattedValue = useMemo(() => {
        if (!pattern) return value
        // return value
    }, [value, pattern])

    return <div className={styles.container}>
        <FormField
            label={formattedLabel + (props.required ? '*' : '')}
            errorText={errorText}
        >
            <Input
                onChange={handleChange}
                value={value}
            />
        </FormField>
            {
                formattedValue
            }
    </div>
}