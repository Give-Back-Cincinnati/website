import styles from './index.module.scss'

export interface EventHeaderProps {
    title?: string
}

export const EventHeader = ({ title = 'Give Back Cincinnati Events' }: EventHeaderProps) => {
    return <div className={styles.container}>
        <h1>
            { title }
        </h1>
    </div>
}
