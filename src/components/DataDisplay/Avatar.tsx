import { useState, useMemo, useCallback } from 'react'
import styles from './Avatar.module.scss'

export interface AvatarProps {
    src?: string
    name: string
}

function getInitials (name: string): string {
    return name
        .split(' ')
        .filter(str => str !== ' ')
        .map(str => str[0])
        .join('')
        .toUpperCase()
}

export const Avatar = ({ src, name }: AvatarProps) => {
    const [ imageHasFailedLoading, setImageHasFailedLoading ] = useState(false)
    const onError = useCallback(() => setImageHasFailedLoading(true), [])
    const imageUnavailable = !src || imageHasFailedLoading

    const initials = useMemo(() => getInitials(name), [ name ])

    return <div className={styles.container}>
        {
            imageUnavailable && (
                <span>{initials}</span>
            )
        }
        {
            !imageUnavailable && (
                <img
                    src={src}
                    onError={onError}
                    alt={name}
                />
            )
        }
    </div>
}