import { useEffect } from 'react'
import { useServices } from 'hooks'
import { Button, Confirm } from '@/components/Utils'
import { UserRegistration, GuestRegistration, useDeleteRegistrationMutation } from '@/store/api/openApi'

export type DeleteProps = {
    eventId: string,
    registration: UserRegistration | GuestRegistration
}

export const Delete = ({ eventId, registration}: DeleteProps) => {
    const Toaster = useServices('Toaster')
    const [ deleteRegistrationTrigger, deleteRegistrationResponse ] = useDeleteRegistrationMutation()

    useEffect(() => {
        if (deleteRegistrationResponse.isSuccess) {
            Toaster.notify({ key: deleteRegistrationResponse.requestId, title: 'Deleted', intent: 'positive' })
        }
        if (deleteRegistrationResponse.isError) {
            Toaster.notify({ key: deleteRegistrationResponse.requestId, title: 'Failed to Delete', intent: 'negative' })
            deleteRegistrationResponse.reset()
        }
    }, [deleteRegistrationResponse, Toaster])

    function deleteRegistration () {
        deleteRegistrationTrigger({
            eventId,
            registrationId: registration._id || ''
        })
    }

    return <div>
        <Confirm action={'Delete'} entityName='Registration' onConfirm={deleteRegistration} />
    </div>
}