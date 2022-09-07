import { ChangeEventHandler, useState } from 'react'
import { Roles, useSearchRolesQuery } from '@/store/api/openApi'
import { Select } from '@/components/Inputs'
import { Button } from '@/components/Utils'

import styles from './NewRole.module.scss'

export type NewRoleProps = {
    currentRole: string | Roles
    onSave: (role: string) => void
    isLoading?: boolean
}

export const NewRole = ({ currentRole, onSave, isLoading = false }: NewRoleProps) => {
    const { data: roles } = useSearchRolesQuery({})
    const [ userRole, setUserRole ] = useState(typeof currentRole === 'string' ? currentRole : (currentRole._id || ''))

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setUserRole(e.target.value)
    }

    function handleSave () {
        if (userRole !== '') {
            onSave(userRole)
        }
    }

    return <div className={styles.container}>
        <h3>Update User Role</h3>
        <div className={styles.formContainer}>
            {
                roles
                ? <Select 
                    name='role'
                    options={[{ _id: '', name: '' }, ...roles].map(({_id = '', name}) => ({ _id, label: name }))}
                    value={userRole}
                    onChange={handleChange}
                />
                : ''
            }
            <div className={styles.button}>
                <Button onClick={handleSave} isLoading={isLoading} disabled={userRole === ''}>Save</Button>
            </div>
        </div>
    </div>
}