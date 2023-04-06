import { NextPageWithLayout } from "pages/_app"
import { AdminLayout } from 'layouts/AdminLayout'
import { useUserHasPermission } from "hooks"
import { useSearchDynamicPagesQuery } from "@/store/api/openApi"
import { CreatePage, EditPage, DeletePage } from "@/components/Admin/DynamicPages"
import { Table } from '@/components/DataDisplay'

import styles from './index.module.scss'

const DynamicPages: NextPageWithLayout = () => {
  const canSeeDynamicPages = useUserHasPermission('dynamicpages.get')
  const { data: dynamicPages } = useSearchDynamicPagesQuery({ })

  return <div>
    <h2>
      Dynamic Pages
    </h2>
    <CreatePage />

    {
      (canSeeDynamicPages && dynamicPages) &&
        <Table
          keys={['name', 'url', 'actions']}
          data={dynamicPages.map(page => ({
            ...page,
            actions: <div className={styles.actions}>
              <EditPage page={page} />
              <DeletePage page={page} />
            </div>
          }))}
        />
    }
  </div>
}

DynamicPages.getLayout = function getLayout(page) {
  return <AdminLayout>
      { page }
  </AdminLayout>
}

export default DynamicPages