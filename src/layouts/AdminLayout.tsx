import { useState, useEffect, ReactElement } from "react"
import styles from './AdminLayout.module.scss'
import Link from "next/link"
import { useRouter } from "next/router"
import { useUserHasPermission } from "hooks"


export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const adminRoutes = [
        '',
        'events',
        'users',
    ]
    const router = useRouter()
    const [currentRoute, setCurrentRoute] = useState<string>(router.asPath)
    const canSeeRoles = useUserHasPermission('roles.get')
    const canSeePermissions = useUserHasPermission('permissions.get')

    useEffect(() => {
        const handleRouteChange = (shallow: string) => {
            setCurrentRoute(shallow)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    if (canSeeRoles) { adminRoutes.push('roles') }
    if (canSeePermissions) { adminRoutes.push('permissions') }

    return (
        <div className={styles.container}>

            <div className={styles.adminNav}>
                {
                    adminRoutes.map(permission => {
                        const linkStyles = [styles.link]
                        const permissionPath = permission ? `/admin/${permission}` : '/admin'
            
                        // need to include router.asPath, if first page load it has not registered correctly [name]
                        if (currentRoute === permissionPath || router.asPath === permissionPath) {
                            linkStyles.push(styles.activePath)
                        }
            
                        return (
                            <Link key={permission} href={permissionPath} className={linkStyles.join(' ')}>

                                {permission || 'Admin'}

                            </Link>
                        );
                    })
                }
            </div>

            <div className={styles.content}>
                { children }
            </div>

        </div>
    );
}

export default AdminLayout
