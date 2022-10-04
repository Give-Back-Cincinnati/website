import { useState, useMemo, useCallback, ReactElement, ChangeEventHandler } from "react"
import { EntitySchema } from "@/types/schema"

import styles from './DynamicForm.module.scss'

import {
    CheckBox,
    DateTimePicker,
    Select,
    TextField,
    TextArea,
} from "./index"
import { Button } from "../Utils"
import { DateTime } from "luxon"

export interface DynamicFormProps {
    entity: EntitySchema
    onSubmit: (state: Record<string, unknown>) => void
    values?: Record<string, unknown>
    hiddenFields?: string[]
    isLoading?: boolean
    isProtected?: boolean
}

export const DynamicForm = ({ entity, onSubmit, values = {}, hiddenFields = [], isLoading = false, isProtected = false }: DynamicFormProps) => {
    // Derive the initial and empty states so they can be used in the created inputs
    const { initialState } = useMemo(() => {
        const { properties } = entity
        const emptyState: Record<string, unknown> = {}
        Object.keys(properties)
            .forEach(propertyKey => {
                const property = properties[propertyKey]
                if (property.readonly || hiddenFields.includes(propertyKey)) return

                switch (property.type) {
                    case 'number':
                        emptyState[propertyKey] = values[propertyKey] || 0
                        break
                    case 'string':
                        // select
                        if ('enum' in property && Array.isArray(property.enum)) {
                            emptyState[propertyKey] = values[propertyKey] || property.enum[0]
                            break
                        }
                        // date
                        if ('format' in property && property.format === 'date-time') {
                            emptyState[propertyKey] = (DateTime.fromISO(values[propertyKey] as string) || DateTime.now()).toFormat("yyyy-MM-dd'T'HH:mm")
                            break
                        }
                        if ('format' in property && property.format === 'date') {
                            emptyState[propertyKey] = (DateTime.fromISO(values[propertyKey] as string) || DateTime.now()).toFormat("yyyy-MM-dd'T'HH:mm")
                            break
                        }
                        emptyState[propertyKey] = values[propertyKey] || ''
                        break
                        // string
                    case 'boolean':
                        emptyState[propertyKey] = values[propertyKey] || false
                        break;
                    default:
                        emptyState[propertyKey] = values[propertyKey] || ''
                }
            })
        return { initialState: emptyState }
    }, [entity, values, hiddenFields])

    const [formState, setFormState] = useState(initialState)

    const handleChangeEvent: ChangeEventHandler = useCallback((e) => {
        const target = e.target as HTMLInputElement
        if (target) {
            const { name, value, checked, type } = target
            if (type === 'checkbox') {
                setFormState({ ...formState, [name]: checked })
                return
            }
            if (name in formState) {
                setFormState({ ...formState, [name]: value })
            }
        }
    }, [formState])

    const handleSubmit = useCallback(() => {
        onSubmit(formState)
    }, [ formState, onSubmit ])

    const inputs = useMemo(() => {
        const { required, properties } = entity
        return Object.keys(properties)
            .map(propertyKey => {
                const property = properties[propertyKey]
                // if property is read only, we don't want the user to see it presented in the form
                if (property.readonly || hiddenFields.includes(propertyKey)) return ''
                const isRequired = required.includes(propertyKey)
                const formValue = formState[propertyKey]

                let content: ReactElement | '' = ''
                switch (property.type) {
                    case 'boolean':
                        if (typeof formState[propertyKey] === 'boolean') {
                            content = <CheckBox
                                name={propertyKey}
                                label={property.name}
                                checked={formValue as boolean} // this is created as a boolean in initialState construction
                                onChange={handleChangeEvent}
                                required={isRequired}
                            />
                        }
                        break;
                    case 'string':
                        // Generate a Select field from enum values
                        if ('enum' in property && Array.isArray(property.enum)) {
                            const selectOptions = property.enum.map(option => ({ _id: option }))
                            content =  <Select
                                value={formValue as string}
                                options={selectOptions}
                                name={propertyKey}
                                label={property.name}
                                onChange={handleChangeEvent}
                                required={isRequired}
                            />
                            break;
                        }
                        // Generate a datetime picker
                        if ('format' in property && property.format === 'date-time') {
                            content = <DateTimePicker
                                name={propertyKey}
                                label={property.name}
                                value={formValue as string}
                                onChange={handleChangeEvent}
                                required={isRequired}
                            />
                            break;
                        }
                        // Generate a date picker
                        if ('format' in property && property.format === 'date') {
                            content = <DateTimePicker
                                name={propertyKey}
                                label={property.name}
                                value={formValue as string}
                                onChange={handleChangeEvent}
                                required={isRequired}
                                type='date'
                            />
                            break;
                        }

                        if (property.maxLength && property.maxLength > 40) {
                            content = <TextArea
                                value={formValue as string}
                                name={propertyKey}
                                label={property.name}
                                onChange={handleChangeEvent}
                                required={isRequired}
                                {...property}
                            />
                            break;
                        }
                        // Generic text field 
                        content =  <TextField
                            value={formValue as string}
                            name={propertyKey}
                            label={property.name}
                            onChange={handleChangeEvent}
                            required={isRequired}
                            {...property}
                        />
                        break;
                    default:
                        content = <TextField
                            value={formValue as string}
                            name={propertyKey}
                            label={property.name}
                            onChange={handleChangeEvent}
                            required={isRequired}
                        />
                }

                return <div key={propertyKey} className={styles.fieldContainer}>
                    { content }
                </div>
            })
    }, [entity, handleChangeEvent, formState, hiddenFields])
    
    return <div className={styles.container}>
        { inputs }
        {
            isProtected && <div className='cf-turnstile' data-sitekey="0x4AAAAAAAAkh6TU2qJvk6ao"></div>
        }
        <Button onClick={handleSubmit} isLoading={isLoading}>Submit</Button>
    </div>
}