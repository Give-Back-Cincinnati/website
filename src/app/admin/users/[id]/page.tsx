"use client"
import { useEffect } from 'react'
import { useGetSchema, useServices } from 'hooks'
import { NewRole } from '@/components/Admin/Users/NewRole'

import { Users, useUpdateUserMutation, useGetUserQuery } from '@/store/api/openApi'
import { DynamicForm } from '@/components/DynamicForm'

import styles from './[_id].module.scss'

export const runtime = 'edge';

export async function generateStaticParams () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`)
    const users: Users[] = await res.json()
    return users.map(user => ({ _id: user._id }))
}

const AdminEditUser = (props: { params: { id: string } }) => {
    const { data, isSuccess } = useGetUserQuery({ id: props.params.id })
    const [ updateUserTrigger, updateUserResult ] = useUpdateUserMutation()
    const Toaster = useServices('Toaster')
    const userSchema = useGetSchema('Users')

    useEffect(() => {
        if (updateUserResult.status === 'fulfilled') {
            Toaster.notify({ key: updateUserResult.requestId, title: 'Update Successful', intent: 'positive' })
        }
    }, [updateUserResult, Toaster])

    function handleSubmit (userUpdate: Record<string, unknown>) {
        updateUserTrigger({ id: props.params.id, body: userUpdate as Users })
    }

    return <div>
        <h2>{data?.firstName} {data?.lastName}</h2>
        <div className={styles.container}>
            { 
                userSchema && isSuccess
                ? <div>
                <h3>Update User Information</h3>
                <DynamicForm
                    entity={userSchema}
                    onSubmit={handleSubmit}
                    values={data}
                    hiddenFields={['role', 'profilePicture']}
                    isLoading={false}
                />
                </div>
                : ''
            }
            {
                data
                && <NewRole
                    currentRole={data.role}
                    onSave={(role) => { handleSubmit({ role }) }}
                />
            }

        </div>
    </div>
}

export default AdminEditUser
