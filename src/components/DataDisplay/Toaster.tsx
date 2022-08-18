import { Alert } from '@/components/Utils'
import { useAppSelector } from '@/store/hooks'
import styles from './Toaster.module.scss'

export const Toaster = () => {
    const { notifications } = useAppSelector(state => state.toaster)

    return <div className={styles.container}>
        {
            notifications.map((alertProps, idx) => <Alert
                key={alertProps.title + idx.toString()}
                {...alertProps}
            />)
        }
    </div>
}