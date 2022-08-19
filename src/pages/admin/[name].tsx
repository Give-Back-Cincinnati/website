import { NextPageWithLayout } from 'pages/_app'
import { useRouter } from 'next/router'
import { AdminLayout } from '../../layouts/AdminLayout'

import { useGetSchema } from 'hooks'
import { Spinner } from '@/components/DataDisplay'

const EventsAdmin: NextPageWithLayout = () => {
    const router = useRouter()
    const schema = useGetSchema(router.query.name)

    return <div>
        {router.query.name}
        <br/>
        {JSON.stringify(schema)}
    </div>
}

EventsAdmin.getLayout = function getLayout(page) {
    return <AdminLayout>
        { page }
    </AdminLayout>
}

export default EventsAdmin