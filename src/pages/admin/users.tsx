import { useState } from 'react' 
import { NextPageWithLayout } from 'pages/_app'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useGetSchema, useUserHasPermission } from 'hooks'

import { Button } from '@/components/Utils'
import { Modal } from '@/components/Utils'

import { useSearchUsersQuery } from '@/store/api/openApi'
import { DynamicForm } from '@/components/Inputs/DynamicForm'

const UsersAdmin: NextPageWithLayout = () => {
    const {
        isSuccess,
        data
    } = useSearchUsersQuery()
    const canSeeUsers = useUserHasPermission('users.get')

    return <div>
        <h2>
            Users
        </h2>
        {
            isSuccess && canSeeUsers && data
                ? <Table
                    keys={['firstName', 'lastName', 'email']}
                    data={data}
                />
                : ''
        }
        {
            !canSeeUsers
                ? 'You don\'t have permission to view this page'
                : ''
        }
    </div>
}

UsersAdmin.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default UsersAdmin