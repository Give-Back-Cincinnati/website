import { useMemo } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useGetSchema, useUserHasPermission } from 'hooks'

import { Button } from '@/components/Utils'
import { Modal } from '@/components/Utils'

import { useSearchRolesQuery, useSearchUsersQuery } from '@/store/api/openApi'

const UsersAdmin: NextPageWithLayout = () => {
    const {
        isSuccess,
        data
    } = useSearchUsersQuery({})
    const { 
        data: roles
    } = useSearchRolesQuery({})
    const canSeeUsers = useUserHasPermission('users.get')

    const formattedData = useMemo(() => {
        if (!data || !roles) return []
        return data.map(user => ({
            ...user,
            role: roles[roles.findIndex(role => role._id === user.role)].name,
            actions: <Button>Edit</Button>
        }))
    }, [data, roles])

    return <div>
        <h2>
            Users
        </h2>
        {
            isSuccess && canSeeUsers && data
                ? <Table
                    keys={['firstName', 'lastName', 'email', 'role',
                    //  'actions'
                    ]}
                    data={formattedData}
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