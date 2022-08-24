import { useMemo, useState, useEffect, ReactElement } from "react"
import styles from './AdminLayout.module.scss'
import Link from "next/link"
import { useRouter } from "next/router"

const adminRoutes = [
    '',
    'events',
    'users',
]

export const AdminLayout = ({ children }: { children: ReactElement }) => {
    const router = useRouter()
    const [currentRoute, setCurrentRoute] = useState<string>(router.asPath)

    useEffect(() => {
        const handleRouteChange = (shallow: string) => {
            setCurrentRoute(shallow)
        }

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    return <div className={styles.container}>

        <div className={styles.adminNav}>
            {
                adminRoutes.map(permission => {
                    const linkStyles = [styles.link]
                    const permissionPath = permission ? `/admin/${permission}` : '/admin'
        
                    // need to include router.asPath, if first page load it has not registered correctly [name]
                    if (currentRoute === permissionPath || router.asPath === permissionPath) {
                        linkStyles.push(styles.activePath)
                    }
        
                    return <Link
                        key={permission}
                        href={permissionPath}
                    >
                        <a className={linkStyles.join(' ')}>
                            {permission || 'Admin'}
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
