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

            <div className={styles.programs}>
                <div>
                    <Link href='/privacy-policy'>Privacy Policy</Link>
                </div>
                <div>
                    <Link href='/terms-of-use'>Terms of Use</Link>
                </div>
            </div>

            <div className={styles.copyright}>Copyright {DateTime.now().toFormat('yyyy')}© Give Back Cincinnati</div>
        </footer>
    );
}
