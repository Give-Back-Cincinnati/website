import { NextPageWithLayout } from 'pages/_app'
import { AdminLayout } from 'layouts/AdminLayout'

const AdminIndex: NextPageWithLayout = () => {
    return <>
        Admin
    </>
}

AdminIndex.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default AdminIndex