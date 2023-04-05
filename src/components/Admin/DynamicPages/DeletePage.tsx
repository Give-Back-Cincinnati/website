import { useEffect } from 'react'
import { useServices } from 'hooks'
import { Confirm } from '@/components/Utils'
import { DynamicPages, useDeleteDynamicPagesMutation } from '@/store/api/openApi'

export type DeleteProps = {
    page: DynamicPages
}

export const DeletePage = ({ page }: DeleteProps) => {
    const Toaster = useServices('Toaster')
    const [ deleteDynamicPageTrigger, deleteDynamicPagesResponse ] = useDeleteDynamicPagesMutation()

    useEffect(() => {
        if (deleteDynamicPagesResponse.isSuccess) {
            Toaster.notify({ key: deleteDynamicPagesResponse.requestId, title: 'Deleted', intent: 'positive' })
        }
        if (deleteDynamicPagesResponse.isError) {
            Toaster.notify({ key: deleteDynamicPagesResponse.requestId, title: 'Failed to Delete', intent: 'negative' })
            deleteDynamicPagesResponse.reset()
        }
    }, [deleteDynamicPagesResponse, Toaster])

    function deleteDynamicPage () {
        deleteDynamicPageTrigger({
            id: page._id
        })
    }

    return <div>
        <Confirm action={'Delete'} entityName='DynamicPages' onConfirm={deleteDynamicPage} />
    </div>
}