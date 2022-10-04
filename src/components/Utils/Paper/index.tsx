import { ReactElement, useMemo } from "react"

import styles from './index.module.scss'

type Props = {
    children: ReactElement
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    padding?: string | number
}

export const Paper = ({ children, elevation = 0, padding = '1.5rem' }: Props) => {
    const containerClasses = useMemo(() => {
        const classes = [styles.container, styles[`elevation-${elevation.toString()}`]]
        return classes.join(' ')
    }, [elevation])

    return <div className={containerClasses} style={{ padding }}>
        { children }
    </div>
}