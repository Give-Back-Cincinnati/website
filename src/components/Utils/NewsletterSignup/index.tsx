import React, { useState, useEffect, useRef } from 'react'

import { useGetSchema } from 'hooks'

import { Spinner } from '@/components/DataDisplay'
import { DynamicForm } from '@/components/DynamicForm'
import { Button, Modal } from '@/components/Utils'

export const NewsletterSignup = () => {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [ isModalOpen, setModalOpen ] = useState(false)

    const EmailSignupSchema = useGetSchema('EmailSignup')

    function toggleModal () {
        setModalOpen(!isModalOpen)
    }

    async function handleSubscription (state: Record<string, unknown>): Promise<void> {
        if (formRef.current) {
            formRef.current.submit()
        }
    }

    return (
        <>
            <Button
                size='lg'
                onClick={toggleModal}
                style={{ margin: 'auto' }}
            >
                Newsletter Signup
            </Button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
            >
                <>
                    <h2 style={{ textAlign: 'center' }}>Sign up for our Newsletter!</h2>
                    <form ref={formRef} method='post' action="https://givebackcincinnati.us12.list-manage.com/subscribe/post?u=160bf2c9daa8af34307358b18&amp;id=0992f3a90c&amp;f_id=00d941e0f0">
                        {
                            EmailSignupSchema
                                ? <DynamicForm
                                    entity={EmailSignupSchema}
                                    onSubmit={handleSubscription}
                                    isProtected
                                />
                                : <Spinner />
                        }
                    </form>
                </>
            </Modal>
        </>
    )
}

export default NewsletterSignup
