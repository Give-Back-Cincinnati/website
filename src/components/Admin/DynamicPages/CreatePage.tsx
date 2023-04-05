import { useState, useEffect, useCallback, ChangeEventHandler } from 'react'
import { useUserHasPermission, useServices } from 'hooks'
import { Modal, Button } from "@/components/Utils"
// import { DynamicForm } from '@/components/DynamicForm'
import { useCreateDynamicPagesMutation, DynamicPages } from '@/store/api/openApi'
// import { EntitySchema } from '@/types/schema'
import ExperienceBuilder from '@/components/ExperienceBuilder/Builder'
import { Experience } from '@/components/ExperienceBuilder'

import styles from './CreatePage.module.scss'
import { TextField } from '@/components/Inputs'

export const CreatePage = () => {
    const canCreatePage = useUserHasPermission('dynamicpages.post')
    const [ isOpen, setIsOpen ] = useState(false)
    const [ formState, setFormState ] = useState({ name: '', url: '' })
    const [ createDynamicPage, createDynamicPageResponse ] = useCreateDynamicPagesMutation()
    const Toaster = useServices('Toaster')

    useEffect(() => {
        if (createDynamicPageResponse.status === 'fulfilled') {
            if (createDynamicPageResponse.isSuccess) {
                Toaster.notify({ key: createDynamicPageResponse.requestId, title: 'Page Created', intent: 'positive' })
            }
        }
    }, [createDynamicPageResponse, Toaster])

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
      setFormState(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [ setFormState ])

    function toggleModal () {
        setIsOpen(!isOpen)
    }

    function handleSubmit (experience: Experience[]) {
        createDynamicPage({
          dynamicPages: {
            name: formState.name,
            url: formState.url,
            experience: JSON.stringify(experience)
          }
        })
        toggleModal()
    }

    if (!canCreatePage) return <div></div>

    return <div>
        <Button onClick={toggleModal}>Create New Dynamic Page</Button>
        <Modal isOpen={isOpen} onRequestClose={toggleModal} >
            <div className={styles.createPageContainer}>
                <h2>Create Page</h2>
                <div className={styles.nameUrlContainer}>
                  <TextField
                    name="name"
                    label="Page Name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <TextField
                    name="url"
                    label="Page URL"
                    value={formState.url}
                    onChange={handleChange}
                    pattern="^[^\/][a-z\-]+[^\/]$"
                  />
                </div>

                <ExperienceBuilder
                  initialExperience={[]}
                  saveExperience={handleSubmit}
                />
            </div>
        </Modal>
    </div>
}