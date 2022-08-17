import { useMemo, ReactElement } from "react"
import { useAppSelector } from "@/store/hooks"
import styles from './AdminLayout.module.scss'
import Link from "next/link"
import { useRouter } from "next/router"

export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const router = useRouter()
    const auth = useAppSelector(state => state.auth)

    const permissionGroups = useMemo(() => {
        const permissionGroups = new Set()
        
        if (auth.me && auth.me.role) {
            auth.me?.role.permissions.forEach(permission => {
                permissionGroups.add(permission.group)
            })
        }

        return Array.from(permissionGroups).sort() as string[]
    }, [auth.me])

    return <div className={styles.container}>

        <div className={styles.adminNav}>
            {
                permissionGroups.map(permission => {
                    const linkStyles = [styles.link]
                    const permissionPath = `/admin/${permission}`

                    if (router.pathname === permissionPath) {
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
        </div>

        <div className={styles.content}>
            { children }
        </div>

    </div>
}

export default AdminLayout
