import { useMemo, useState, useEffect, ReactElement } from "react"
import styles from './AdminLayout.module.scss'
import Link from "next/link"
import { useRouter } from "next/router"

import { useGetMeQuery } from "@/store/api/openApi"

export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const router = useRouter()
    const [currentRoute, setCurrentRoute] = useState<string>(router.pathname)

    useEffect(() => {
        router.events.on('routeChangeComplete', (shallow) => {
            setCurrentRoute(shallow)
        })
    }, [router])

    const {
        data: me,
        isError, isSuccess
    } = useGetMeQuery()

    if (isError) {
        router.push('/')
    }

    const permissionGroups = useMemo(() => {
        const permissionGroups = new Set()
        
        if (me && me.role) {
            me?.role.permissions.forEach(permission => {
                permissionGroups.add(permission.group)
            })
        }

        return Array.from(permissionGroups).sort() as string[]
    }, [me])


    let content: ReactElement | ReactElement[] = <div />
    
    if (isSuccess) {
        content = permissionGroups.map(permission => {
            const linkStyles = [styles.link]
            const permissionPath = `/admin/${permission}`

            if (currentRoute === permissionPath) {
                linkStyles.push(styles.activePath)
            }

            return <Link
                key={permission}
                href={permissionPath}
            >
                <a className={linkStyles.join(' ')}>
                    {permission}
                </a>
            </Link>
        })
    }

    return <div className={styles.container}>

        <div className={styles.adminNav}>
            {
                content
            }
        </div>

        <div className={styles.content}>
            { children }
        </div>

    </div>
}

export default AdminLayout
