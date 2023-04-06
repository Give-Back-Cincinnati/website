import { useMemo } from 'react'
import { NextPageWithLayout } from 'pages/_app'
import { Table } from '@/components/DataDisplay'
import { AdminLayout } from 'layouts/AdminLayout'
import { useUserHasPermission } from 'hooks'
import { useRouter } from 'next/router'

import { Button } from '@/components/Utils'

import { useSearchRolesQuery, useSearchUsersQuery } from '@/store/api/openApi'

const UsersAdmin: NextPageWithLayout = () => {
    const router = useRouter()
    const {
        isSuccess,
        data
    } = useSearchUsersQuery({ limit: 0 })
    const { 
        data: roles
    } = useSearchRolesQuery({})
    const canSeeUsers = useUserHasPermission('users.get')
    const canUpdateUsers = useUserHasPermission('users.id.patch')

    const formattedData = useMemo(() => {
        if (!data || !roles) return []
        return data.map(user => ({
            ...user,
            role: roles[roles.findIndex(role => role._id === user.role)].name,
            actions: <Button onClick={() => router.push(`/admin/users/${user._id}`)}>Edit</Button>
        }))
    }, [data, roles, router])

    const keys = ['firstName', 'lastName', 'email', 'role']

    if (canUpdateUsers) {
        keys.push('actions')
    }

    return <div>
        <h2>
            Users
        </h2>
        {
            isSuccess && canSeeUsers && data
                ? <Table
                    keys={keys}
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