import { NextPage } from "next"
import { HorizontalBreak, LeftDashedBorder } from "@/components/Backgrounds"
import { Button } from "@/components/Utils"

import styles from './index.module.scss'

const highlights: {highlight: string, title: string, description: string}[] = [
    { highlight: "83", title: "Ideas Funded", description: "We've fueled 83 ideas to completion, and we're just getting started." },
    { highlight: "$103,286", title: "Money Awarded", description: "We've awarded $103,286 to great nonprofit projects.  Want to be one of them?" },
    { highlight: "100%", title: "Volunteers", description: "All of our committee members are young professional volunteers." },
]

const provides: {title: string, description: string}[] = [
    { title: "Funding", description: "Fuel Cincinnati provides the initial dollars to get your idea off the ground and running.  We typically provide from $500 to $2500 in funding to jump start your idea."},
    { title: "Connections", description: "We don't just provide dollars. We also provide connections to volunteers and community leaders, as well as logistical support to help you make your idea a reality. We are a group of diverse young professional volunteers with networks and connections all over Cincinnati and Northern Kentucky."},
    { title: "Mentorship", description: "Being a part of Give Back Cincinnati, we believe in investing in today's communities and tomorrow's leaders. We take that very seriously, and want to invest not only in your idea, but in you as an individual, so you can develop into a leader for your community."},
]

export const FuelHomePage: NextPage = () => {
    return <div className={styles.container}>
        <HorizontalBreak>
            <h1>
                Fuel Cincinnati
            </h1>
        </HorizontalBreak>
        <h2>We launch great nonprofit ideas</h2>

        <div className={styles.apply}>
            <video controls>
                <source src="/fuel/fuel_video.mp4" type="video/mp4" />
            </video>
            <div>
                <h2>What&apos;s YOUR idea?</h2>
                <h2>We can help.</h2>
                <Button size="xl">Apply</Button>
            </div>
        </div>
        
        <div className={styles.whoWeAreContainer}>
            <div className={styles.weAre}>
                <h2>Who We Are</h2>
                <p>
                    We are <strong>Young Professionals</strong>.
                    We are <strong>Volunteers</strong>.
                    We are <strong>Passionate</strong>.
                    We are <strong>Connected</strong>.
                </p>
                <strong>We are Fuel Cincinnati</strong>.
            </div>
            <div className={styles.highlightContainer}>
                {
                    highlights.map(({ highlight, title, description}) => (
                        <div key={highlight}>
                            <p className={styles.highlight}>{ highlight }</p>
                            <p>{ title }</p>
                            <p className={styles.description}>{ description }</p>
                        </div>
                    ))
                }
            </div>
        </div>
            
        <div className={styles.whatWeProvideContainer}>
            <h1>
                What We Provide
            </h1>
            {
                provides.map(({ title, description}) => (
                    <div className={styles.provides} key={title}>
                        <h2>{ title }</h2>
                        <p>
                            { description }
                        </p>
                    </div>
                ))
            }
        </div>

    </div>
}

export default FuelHomePage