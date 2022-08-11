import styles from './index.module.scss'

export const EventDetails = () => {
    return <div className={styles.container}>
        <h2>
            EVENT DETAILS
        </h2>
        <div className={styles.detail}>
            <span>Date:</span>
            <span>Thursday, December 6th</span>
        </div>
        <div className={styles.detail}>
            <span>Time:</span>
            <span>7pm - 10pm</span>
        </div>
        <div className={styles.detail}>
            <span>Location:</span>
            <span>The Globe Covington, 12 E 5th Street, Covington, KY 41011</span>
        </div>
        
    </div>
}