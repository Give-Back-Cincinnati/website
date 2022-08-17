import { ComponentPropsWithoutRef } from "react"

import styles from './Table.module.scss'

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
    keys: string[]
    data: Record<string, string | JSX.Element>[]
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
                                return <td key={key}>
                                    { row[key] }
                                </td>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    </table>
}