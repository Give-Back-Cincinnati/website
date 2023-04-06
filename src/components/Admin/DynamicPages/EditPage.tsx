import { useState, useEffect, useCallback, ChangeEventHandler } from 'react'
import { useUserHasPermission, useServices } from 'hooks'
import { Modal, Button } from "@/components/Utils"
import { useUpdateDynamicPagesMutation, DynamicPages } from '@/store/api/openApi'
import ExperienceBuilder from '@/components/ExperienceBuilder/Builder'
import { Experience } from '@/components/ExperienceBuilder'

import styles from './CreatePage.module.scss'
import { TextField } from '@/components/Inputs'

export const EditPage = ({ page }: { page: DynamicPages }) => {
    const canEditPage = useUserHasPermission('dynamicpages.id.patch')
    const [ isOpen, setIsOpen ] = useState(false)
    const [ formState, setFormState ] = useState({ name: page.name, url: page.url || '' })
    const [ editDynamicPage, editDynamicPageResponse ] = useUpdateDynamicPagesMutation()
    const Toaster = useServices('Toaster')

    useEffect(() => {
        if (editDynamicPageResponse.status === 'fulfilled') {
            if (editDynamicPageResponse.isSuccess) {
                Toaster.notify({ key: editDynamicPageResponse.requestId, title: 'Page Saved', intent: 'positive' })
            }
        }
    }, [editDynamicPageResponse, Toaster])

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
      setFormState(state => ({ ...state, [e.target.name]: e.target.value }))
    }, [ setFormState ])

    function toggleModal () {
        setIsOpen(!isOpen)
    }

    function handleSubmit (experience: Experience[]) {
        editDynamicPage({
          id: page._id,
          dynamicPages: {
            name: formState.name,
            url: formState.url,
            experience: JSON.stringify(experience)
          }
        })
        toggleModal()
    }

    if (!canEditPage) return <div></div>

    return <div>
        <Button onClick={toggleModal} variant="outlined">
            Edit
        </Button>
        <Modal isOpen={isOpen} onRequestClose={toggleModal} >
            <div className={styles.createPageContainer}>
                <h2>Edit Page: { page.name }</h2>
                <div className={styles.nameUrlContainer}>
                  <TextField
                    name="name"
                    label="Page Name"
                    value={formState.name}
                    onChange={handleChange}
                    disabled={true}
                  />
                  <TextField
                    name="url"
                    label="Page URL"
                    value={formState.url}
                    onChange={handleChange}
                    disabled={true}
                  />
                </div>
                <ExperienceBuilder
                  initialExperience={JSON.parse(page.experience || '[]')}
                  saveExperience={handleSubmit}
                />
            </div>
        </Modal>
    </div>
}