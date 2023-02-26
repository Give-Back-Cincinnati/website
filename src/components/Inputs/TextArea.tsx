import React, { ComponentPropsWithoutRef, ChangeEventHandler, useMemo, ChangeEvent } from 'react'
import { useFormatInputLabel } from 'hooks'

import { Textarea, TextareaProps, FormField } from '@cloudscape-design/components'

import styles from './TextArea.module.scss'
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events'

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
    name: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    value: string
    label?: string | JSX.Element
    fullWidth?: boolean
    error?: boolean
    errorText?: string
    pattern?: string
}

export const TextArea = ({
    name,
    label,
    value,
    onChange,
    error = false,
    errorText,
    fullWidth = false,
    pattern,
    ...props
}: TextAreaProps) => {
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

    const handleChange: NonCancelableEventHandler<TextareaProps.ChangeDetail> = (e) => {
        onChange({
            target: {
                name,
                value: e.detail.value
            }
        } as unknown as ChangeEvent<HTMLTextAreaElement>)
    }

    return <div className={styles.container}>
        <FormField
            label={formattedLabel + (props.required ? '*' : '')}
            errorText={errorText}
        >
            <Textarea
                onChange={handleChange}
                value={value}
            />
        </FormField>
    </div>
}