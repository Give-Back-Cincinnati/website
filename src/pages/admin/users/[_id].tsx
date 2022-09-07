import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AdminLayout } from 'layouts/AdminLayout'
import { NextPageWithLayout } from "pages/_app"
import { useGetSchema, useServices } from 'hooks'
import { NewRole } from '@/components/Admin/Users/NewRole'

import { Users, useUpdateUserMutation, useLazyGetUserQuery } from '@/store/api/openApi'
import { DynamicForm } from '@/components/Inputs'

import styles from './[_id].module.scss'

const AdminEditUser: NextPageWithLayout = () => {
    const {query, isReady} = useRouter()
    const [ trigger, { data, isSuccess } ] = useLazyGetUserQuery()
    const [ updateUserTrigger, updateUserResult ] = useUpdateUserMutation()
    const Toaster = useServices('Toaster')
    const userSchema = useGetSchema('Users')

    useEffect(() => {
        if (isReady) {
            trigger({ id: query._id })
        }

    }, [trigger, query, isReady])

    useEffect(() => {
        if (updateUserResult.status === 'fulfilled') {
            Toaster.notify({ key: updateUserResult.requestId, title: 'Update Successful', intent: 'positive' })
        }
    }, [updateUserResult, Toaster])

    function handleSubmit (userUpdate: Record<string, unknown>) {
        updateUserTrigger({ id: query._id, body: userUpdate as Users })
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

AdminEditUser.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default AdminEditUser
