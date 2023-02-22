import React, { ComponentPropsWithoutRef, ChangeEvent, ChangeEventHandler } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import styles from './Select.module.scss'
import { useFormatInputLabel } from 'hooks'

import { FormField, Select as CSSelect, SelectProps as CSSelectProps } from '@cloudscape-design/components'
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events'

export interface SelectOptions {
    _id: string
    label?: string
}

type InputComponent = Omit<ComponentPropsWithoutRef<'select'>, 'value'>
export interface SelectProps extends InputComponent {
    name: string
    options: SelectOptions[]
    value: CSSelectProps.Option
    onChange: ChangeEventHandler
    label?: string | JSX.Element
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

    const formattedLabel = useFormatInputLabel({ label, name })

    const handleChange: NonCancelableEventHandler<CSSelectProps.ChangeDetail> = (e) => {
        props.onChange({
            target: {
                name,
                value: e.detail.selectedOption
            }
        } as unknown as ChangeEvent<HTMLInputElement>)
    }
    
    return <div className={styles.selectContainer}>
        <FormField
            label={formattedLabel}
        >
            <CSSelect
                selectedOption={{ label: value.label, value: value.value }}
                options={options.map(option => ({ label: option.label || option._id, value: option._id }))}
                onChange={handleChange}
            />
        </FormField>
    </div>

    // return <div className={containerStyles.join(' ')}>
    //         <label htmlFor={name}>{ formattedLabel }{ props.required ? '*' : '' }</label>
    //         <select 
    //             {...props}
    //             value={value}
    //             name={name}
    //         >
    //             {
    //                 nullable ? <option value=''></option> : ''
    //             }
    //             {
    //                 options.map(({ label, _id }) => <option key={_id} value={_id}>{label || _id}</option>)
    //             }
    //         </select>
    //         <MdKeyboardArrowDown className={styles.downArrow} />
    //         <div className={styles.errorText}>
    //             {errorText}
    //         </div>
    //     </div>
}