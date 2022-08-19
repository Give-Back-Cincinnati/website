import React, { ComponentPropsWithoutRef } from "react"

import styles from './Table.module.scss'

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
    keys: string[]
    data: Record<string, unknown>[]
    className?: string
}

export const Table = ({ keys, data, className, ...props }: TableProps) => {
    const containerStyles = [styles.container]
    
    if (className) {
        containerStyles.push(className)
    }

    return <table {...props} className={containerStyles.join(' ')}>
        <thead>
            <tr>
                {
                    keys.map(key => <th key={key}>{ key }</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row, idx) => {
                    return <tr key={idx}>
                        {
                            keys.map(key => {
                                const val = row[key]
                                if (typeof val === 'string') {
                                    return <td key={key}>
                                        { val }
                                    </td>
                                }
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    </table>
}