import { useState, useMemo, useCallback, ReactElement, ChangeEventHandler } from "react"
import { EntitySchema } from "@/types/schema"

import styles from './DynamicForm.module.scss'

import {
    CheckBox,
    DateTimePicker,
    Select,
    TextField,
} from "./index"
import { Button } from "../Utils"
import { DateTime } from "luxon"

export interface DynamicFormProps {
    entity: EntitySchema
    submit: (state: Record<string, unknown>) => void
}

export const DynamicForm = ({ entity, submit }: DynamicFormProps) => {
    // Derive the initial and empty states so they can be used in the created inputs
    const { initialState } = useMemo(() => {
        const { properties } = entity
        const emptyState: Record<string, unknown> = {}
        Object.keys(properties)
            .forEach(propertyKey => {
                const property = properties[propertyKey]
                if (property.readonly) return

                switch (property.type) {
                    case 'number':
                        emptyState[propertyKey] = 0
                        break
                    case 'string':
                        // select
                        if ('enum' in property && Array.isArray(property.enum)) {
                            emptyState[propertyKey] = ''
                            break
                        }
                        // date
                        if ('format' in property && property.format === 'date-time') {
                            emptyState[propertyKey] = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm")
                            break
                        }
                        emptyState[propertyKey] = ''
                        break
                        // string
                    case 'boolean':
                        emptyState[propertyKey] = false
                        break;
                    default:
                        emptyState[propertyKey] = ''
                }
            })
        return { initialState: emptyState }
    }, [entity])

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
        submit(formState)
    }, [ formState, submit ])

    const inputs = useMemo(() => {
        const { required, properties } = entity
        return Object.keys(properties)
            .map(propertyKey => {
                const property = properties[propertyKey]
                // if property is read only, we don't want the user to see it presented in the form
                if (property.readonly) return ''
                const isRequired = required.includes(propertyKey)
                const formValue = formState[propertyKey]

                let content: ReactElement | '' = ''
                switch (property.type) {
                    case 'boolean':
                        if (typeof formState[propertyKey] === 'boolean') {
                            content = <CheckBox
                                name={propertyKey}
                                checked={formValue as boolean} // this is created as a boolean in initialState construction
                                onChange={handleChangeEvent}
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
                                label={propertyKey}
                                onChange={handleChangeEvent}
                                required={isRequired}
                            />
                            break;
                        }
                        // Generate a datetime picker
                        if ('format' in property && property.format === 'date-time') {
                            content = <DateTimePicker
                                name={propertyKey}
                                value={formValue as string}
                                onChange={handleChangeEvent}
                                required={isRequired}
                            />
                            break;
                        }
                        // Generic text field 
                        content =  <TextField
                            value={formValue as string}
                            name={propertyKey}
                            label={propertyKey}
                            onChange={handleChangeEvent}
                            required={isRequired}
                        />
                        break;
                    default:
                        content = <TextField
                            value={formValue as string}
                            name={propertyKey}
                            label={propertyKey}
                            onChange={handleChangeEvent}
                            required={isRequired}
                        />
                }

                return <div key={propertyKey} className={styles.fieldContainer}>
                    { content }
                </div>
            })
    }, [entity, handleChangeEvent, formState])
    
    return <div className={styles.container}>
        { inputs }
        <Button onClick={handleSubmit}>Submit</Button>
    </div>
}