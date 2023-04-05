import styles from './index.module.scss'

import { AvailableFields } from '@/components/ExperienceBuilder'

export interface EventHeaderProps {
    title?: string
    category?: string
}

export const EventHeaderFields: AvailableFields<
    { title: { type: string }, category: { type: string } }
> = {
    title: { type: 'string' },
    category: { type: 'string' }
}

export const EventHeader = ({ title = 'Give Back Cincinnati Events', category = '' }: EventHeaderProps) => {
    return <div className={styles.container}>
        {
            !!category && <h2>
                { category }
            </h2>
        }
        <h1>
            { title }
        </h1>
    </div>
}
