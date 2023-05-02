import React, { useState, useEffect, useCallback, ChangeEventHandler } from 'react'
import { useRouter } from 'next/router'
import { Button, Modal } from '@/components/Utils'
import { TextField, TextArea, CheckBox } from '@/components/Inputs'
import { nanoid } from 'nanoid'
import { Events, useLazyGetEventsQuery, useUpdateEventsMutation } from '@/store/api/openApi'
import { useServices } from "hooks"

import styles from './AddCustomField.module.scss'

export const AddCustomField = (props: { eventId: string }) => {
    const { isReady, query } = useRouter()
    const [ getEventsTrigger, { data: eventData, isSuccess }] = useLazyGetEventsQuery()
    const [ isOpen, setOpen ] = useState(false)
    const [ isSaving, setSaving ] = useState(false)
    const [ formState, setFormState ] = useState({
        name: '',
        options: '',
        required: false
    })
    const [ updateEventTrigger, updateEventResult ] = useUpdateEventsMutation()
    const Toaster = useServices('Toaster')

    const toggleOpen = useCallback(() => {
        setOpen(isCurrentlyOpen => !isCurrentlyOpen)
    }, [])

    useEffect(() => {
        if (isReady) {
            getEventsTrigger({ id: query._id })
        }
    }, [isReady, query, getEventsTrigger])

    useEffect(() => {        
        if (updateEventResult.status === 'fulfilled') {
            setSaving(false)
            toggleOpen()
            Toaster.notify({ key: updateEventResult.requestId, title: 'Update Successful', intent: 'positive'})
            setFormState({
                name: '',
                options: '',
                required: false
            })
            updateEventResult.reset()
        }
    }, [updateEventResult, updateEventResult.status, setFormState, Toaster, toggleOpen])


    const handleFormChange: ChangeEventHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.type !== 'checkbox' ? e.target.value : e.target.checked
        }))
    }, [])

    const handleSave = useCallback(() => {
        setSaving(true)

        const fieldId = nanoid()
        const customFields: Events['customFields'] = {}

        if (eventData && eventData.customFields) {
            Object.keys(eventData.customFields).forEach(key => {
                if (eventData && eventData.customFields) {
                    customFields[key] = eventData.customFields[key]
                }
            })
        }

        customFields[fieldId] = {
            type: 'string',
            name: formState.name,
            required: formState.required
        }

        const options = formState.options.split('\n').filter(option => option !== '')
        if (options.length > 0) {
            customFields[fieldId].enum = options
        }

        updateEventTrigger({
            id: props.eventId,
            events: {
                customFields
            } as unknown as Events
        })
    }, [ updateEventTrigger, props.eventId, formState, eventData ])

    return <div>
        <h3>Add Custom Fields</h3>
        <Button onClick={toggleOpen}>Add Field</Button>
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleOpen}
        >
            <div className={styles.container}>
                <h3>Add Custom Field</h3>
                <div className={styles.fieldContainer}>
                    <TextField
                        name="name"
                        label="Field Label"
                        value={formState.name}
                        onChange={handleFormChange}
                    />
                </div>
                
                <div className={styles.fieldContainer}>
                    <CheckBox
                        name="required"
                        label="Required"
                        checked={formState.required}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={styles.fieldContainer}>
                    <TextArea
                        name="options"
                        label="Field Options"
                        value={formState.options}
                        onChange={handleFormChange}
                        errorText='Enter each option on a new line or leave blank for a text field'
                    />
                </div>
                
                <p className={styles.saveMessage}>This CAN&apos;T be undone</p>
                <Button onClick={handleSave} isLoading={isSaving}>Save Field</Button>
            </div>
        </Modal>
    </div>
}