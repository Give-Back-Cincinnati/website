import { useEffect } from 'react'
import { useServices } from 'hooks'
import { Button } from '@/components/Utils'
import { UserRegistration, GuestRegistration, useUpdateRegistrationMutation } from '@/store/api/openApi'

export type CheckInProps = {
    eventId: string,
    registration: UserRegistration | GuestRegistration
}

export const CheckIn = ({ eventId, registration}: CheckInProps) => {
    const Toaster = useServices('Toaster')
    const [ updateRegistration, updateRegistrationResponse ] = useUpdateRegistrationMutation()

    useEffect(() => {
        if (updateRegistrationResponse.isSuccess) {
            Toaster.notify({ key: updateRegistrationResponse.requestId, title: 'Checked In!', intent: 'positive' })
        }
        if (updateRegistrationResponse.isError) {
            Toaster.notify({ key: updateRegistrationResponse.requestId, title: 'Check In Failed', intent: 'negative' })
            updateRegistrationResponse.reset()
        }
    }, [updateRegistrationResponse, Toaster])

    function checkUserIn () {
        updateRegistration({
            eventId,
            registrationId: registration._id || '',
            body: {
                ...registration,
                checkedIn: true
            }
        })
    }

    return <div>
        {
            registration.checkedIn || updateRegistrationResponse.isSuccess
            ? <Button variant='outlined' disabled={true}>Checked In</Button>
            : <Button onClick={checkUserIn} isLoading={updateRegistrationResponse.status === 'pending'}>Check In</Button>
        }
    </div>
}