import React, { ComponentPropsWithoutRef, ChangeEventHandler, useMemo, ChangeEvent } from 'react'
import { DateTime } from 'luxon'
import styles from './DateTimePicker.module.scss'
import { useFormatInputLabel } from 'hooks'

import { FormField, DatePicker, TimeInput, CalendarProps, DatePickerProps } from '@cloudscape-design/components'
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events'
import { BaseChangeDetail } from '@cloudscape-design/components/input/interfaces'

type InputComponent = Omit<ComponentPropsWithoutRef<'input'>, 'value'>

export interface DateTimePickerProps extends InputComponent {
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    value: {
        date: string,
        time: string
    }
    type?: 'date' | 'datetime-local'
    label?: string | JSX.Element
    fullWidth?: boolean
    error?: boolean
    errorText?: string
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
    const formattedLabel = useFormatInputLabel({ label, name })

    const handleDateChange: NonCancelableEventHandler<CalendarProps.ChangeDetail | BaseChangeDetail> = (e) => {
        onChange({
            target: {
                name: name,
                value: {
                    ...value,
                    date: e.detail.value
                }
            }
        } as unknown as ChangeEvent<HTMLInputElement>)
    }
    const handleTimeChange: NonCancelableEventHandler<CalendarProps.ChangeDetail | BaseChangeDetail> = (e) => {
        onChange({
            target: {
                name: name,
                value: {
                    ...value,
                    time: e.detail.value
                }
            }
        } as unknown as ChangeEvent<HTMLInputElement>)
    }

    let includeTime = <></>

    if (type === 'datetime-local') {
        includeTime = <FormField
            label={"Time" + (props.required ? '*' : '')}
            constraintText='Time in HH:MM format'
        >
            <TimeInput
                value={value.time}
                onChange={handleTimeChange}
                format="hh:mm"
                invalid={error}
                ariaRequired={props.required}
            />
        </FormField>
    }

    return <>
        <div className={styles.datePickerContainer}>
            {
                typeof formattedLabel === 'string'
                    ? <h4>{formattedLabel}</h4>
                    : formattedLabel
            }
            <FormField
                label={'Date' + (props.required ? '*' : '')}
                constraintText="Date in YYYY/MM/DD format"
            >
                <DatePicker
                    value={value.date}
                    onChange={handleDateChange}
                    todayAriaLabel='Today'
                    nextMonthAriaLabel='Next month'
                    previousMonthAriaLabel='Previous month'
                    invalid={error}
                    ariaRequired={props.required}
                    expandToViewport
                />
            </FormField>
            {
                includeTime
            }
        </div>
    </>
}