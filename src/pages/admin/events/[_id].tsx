import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useRouter } from "next/router"

export const AdminEventDetails: NextPageWithLayout = () => {
    const router = useRouter()
    return <>
     <h2>
        This page is in progress...
     </h2>
        { router.query._id }
    </>
}

AdminEventDetails.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default AdminEventDetails
