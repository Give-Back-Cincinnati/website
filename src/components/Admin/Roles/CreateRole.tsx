import { useState, useEffect, useMemo } from 'react'
import { useUserHasPermission, useServices } from 'hooks'
import { Modal, Button } from "@/components/Utils"
import { DynamicForm } from '@/components/DynamicForm'
import { useSearchPermissionsQuery, useCreateRoleMutation } from '@/store/api/openApi'
import { EntitySchema } from '@/types/schema'

export const CreateRole = () => {
    const canCreateRole = useUserHasPermission('roles.post')
    const [isOpen, setIsOpen] = useState(false)
    const { data: permissions } = useSearchPermissionsQuery({ sort: 'group', order: 'asc' })
    const [ createRole, createRoleResponse ] = useCreateRoleMutation()
    const Toaster = useServices('Toaster')

    const roleSchema = useMemo(() => {
        const schema: EntitySchema = {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string'
                }
            }
        }

        if (permissions) {
            permissions.forEach(({ _id = '', name }) => {
                schema.properties[_id] = {
                    type: 'boolean',
                    name,
                }
            })
        }

        return schema
    }, [permissions])

    useEffect(() => {
        if (createRoleResponse.status === 'fulfilled') {
            if (createRoleResponse.isSuccess) {
                Toaster.notify({ key: createRoleResponse.requestId, title: 'Role Created', intent: 'positive' })
            }
        }
    }, [createRoleResponse, Toaster])

    function toggleModal () {
        setIsOpen(!isOpen)
    }

    function handleSubmit (roleDetails: Record<string, unknown>) {
        const newRole: { name: string, permissions: string[], filters: string[] } = {
            name: roleDetails.name as string,
            permissions: [],
            filters: []
        }
        Object.entries(roleDetails).forEach(([key, value]) => {
            if (key !== 'name' && value === true) {
                newRole.permissions.push(key)
            }
        })
        createRole({ roles: newRole })
        toggleModal()
    }

    if (!canCreateRole) return <div></div>

    return <div>
        <Button onClick={toggleModal}>Create New Role</Button>
        <Modal isOpen={isOpen} onRequestClose={toggleModal}>
            <div>
                <h2>Create Role</h2>
                {
                    permissions && 
                    <DynamicForm
                        entity={roleSchema}
                        onSubmit={handleSubmit}
                    />
                }
            </div>
        </Modal>
    </div>
}