import { useState } from 'react'
import { NextPage } from "next"
import styles from './index.module.scss'
import { Button, DonateModal } from "@/components/Utils"
import { HorizontalBreak, LeftDashedBorder } from '@/components/Backgrounds'


const FallFeast: NextPage = () => {
    const [isDonateOpen, setDonateOpen] = useState(false)

    function toggleDonate () {
        setDonateOpen(!isDonateOpen)
    }

    return <div>
        <HorizontalBreak style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                <h1>Fall Feast</h1>
        </HorizontalBreak>
        <LeftDashedBorder>
            <div className={styles.description}>
                <p>
                    In 2005 our Give Back Cincinnati team began serving and sharing a Thanksgiving meal - Fall Feast.  The hope was to take time out of the busy holiday to join as a community in celebration of gratitude.
                </p>
                <p>
                    We are excited to join together as a community this Thanksgiving,
                    <span className={styles.highlight}>
                        Thursday, November 24, 2022 
                    </span> at the Duke Energy Convention Center.
                </p>
                <p>
                    Fall Feast has a mission to change our community for the better through celebration, connection, and the passion to serve others. This calling has led to the rapid growth of one of the largest Thanksgiving meals in the region. With the help of local businesses, neighbors, and community members, this event has blossomed into a true community celebration that oﬀers more than a meal. 
                </p>
                <div>
                    <Button onClick={toggleDonate}>Donate</Button>
                    <DonateModal campaign='/fall-feast-2022' isOpen={isDonateOpen} onRequestClose={toggleDonate} />
                </div>
            </div>
        </LeftDashedBorder>
        <div>
            <iframe width="280" height="157" src="https://www.youtube.com/embed/bhJ0zcyK2DA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </div>
}

export default FallFeast