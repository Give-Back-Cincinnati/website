import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useUserHasPermission } from "hooks"
import { useSearchPermissionsQuery } from "@/store/api/openApi"
import { Table } from '@/components/DataDisplay'

const AdminPermissions: NextPageWithLayout = () => {
    const canSeePermissions = useUserHasPermission('permissions.get')
    const { data: permissions } = useSearchPermissionsQuery({ sort: 'group', order: 'asc', limit: 0 })

    return <div>
        <h2>
            Permissions
        </h2>
        {
            (canSeePermissions && permissions) &&
            <Table
                keys={['group', 'name']}
                data={permissions}
            />
        }
    </div>
}

AdminPermissions.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
} 

export default AdminPermissions