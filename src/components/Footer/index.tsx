import React from "react"
import styles from './index.module.scss'

import { DateTime } from "luxon"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className={styles.container}>

            <div className={styles.gbc}>
                <h2>Give Back Cincinnati</h2>
                <div>Developing today&apos;s communities and tomorrow&apos;s leaders.</div>
            </div>

            <div>
                <Link href='/events'>

                    <h2>Upcoming Events</h2>

                </Link>
            </div>

            <div className={styles.programs}>
                <h2>Programs</h2>
                <ul>
                    <li>Fall Feast</li>
                    <li>Give Back Beyond</li>
                    <li>Fuel Cincinnati</li>
                    <li>Paint the Town</li>
                    <li>Cincy YP</li>
                </ul>
            </div>

            <div className={styles.copyright}>Copyright {DateTime.now().toFormat('yyyy')}© Give Back Cincinnati</div>
        </footer>
    );
}
