import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useUserHasPermission } from "hooks"
import { useSearchRolesQuery } from "@/store/api/openApi"
import { Table } from "@/components/DataDisplay"

import { CreateRole } from "@/components/Admin/Roles/CreateRole"

const AdminRoles: NextPageWithLayout = () => {
    const canSeeRoles = useUserHasPermission('roles.get')
    const { data: roles } = useSearchRolesQuery({})

    return <div>
        <h2>Roles</h2>
        
        <CreateRole />

        {
            (canSeeRoles && roles) &&
            <Table
                keys={['name']}
                data={roles}
            />
        }
    </div>
}

AdminRoles.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
} 

export default AdminRoles