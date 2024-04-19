import React from "react";
import Head from "next/head";
import { EventCard } from "@/components/Events";
import { NewsletterSignup } from "@/components/Utils";
import { BulletList, LeftDashedBorder } from "@/components/Backgrounds";

import styles from "./index.module.scss";
import { SearchEventsApiResponse } from "@/store/api/openApi";
import SeeAllEvents from "./SeeAllEvents";

export const runtime = "edge";

const whoWeAreTexts = [
  <React.Fragment key={0}>
    A <span className="redUnderline">Diverse</span> group of young professionals
  </React.Fragment>,
  <React.Fragment key={1}>
    COMMITTED TO <span className="redUnderline">GIVING BACK</span> TO OUR
    COMMUNITY
  </React.Fragment>,
  <React.Fragment key={2}>
    CURRENT AND FUTURE <span className="redUnderline">VISIONARY LEADERS</span>
  </React.Fragment>,
  <React.Fragment key={3}>
    GLOBAL <span className="redUnderline">ADVENTURERS</span> HELPING OUT ABROAD
  </React.Fragment>,
  <React.Fragment key={4}>
    DEDICATED TO <span className="redUnderline">LOCAL</span> PHILANTHROPIC
    INITIATIVES
  </React.Fragment>,
];

const volunteerOpportunities = [
  {
    logo: "/logos/civic-engagement.svg",
    title: "Civic Engagement",
    description:
      "Sounding off on local issues and taking a closer look at our community.",
  },
  {
    logo: "/logos/interactive.svg",
    title: "Interactive",
    description:
      "From school-kids to senior citizens, we're engaged at all levels.",
  },
  {
    logo: "/logos/hands-on.svg",
    title: "Hands-On",
    description:
      "We get our hands dirty at parks, in schools, and on city streets.",
  },
  {
    logo: "/logos/social.svg",
    title: "Social",
    description:
      "We kick up our feet at social outings and make a buck for Give Back.",
  },
  {
    logo: "/logos/fallfeast.svg",
    title: "Fall Feast",
    description:
      "Sharing hot meals and holiday memories with all members of our community.",
  },
  {
    logo: "/logos/fuel.svg",
    title: "Fuel Cincinnati",
    description:
      "Fueling Young Professionals to Fuel Cincinnati™ through funding, connections, and mentorship.",
  },
  {
    logo: "/logos/givebackbeyond-alt.svg",
    title: "Give Back Beyond",
    description: "Our international service missions know no borders.",
  },
  {
    logo: "/logos/paintthetown-alt1.svg",
    title: "Paint the Town",
    description:
      "Rejuvenating homes and reviving spirits in local neighborhoods.",
  },
];

export default async function Home() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/events?limit=6&endTime%5B%24gt%5D=${new Date().toLocaleDateString()}&sort=startTime&order=asc`,
    { cache: "no-store" }
  );
  const events: SearchEventsApiResponse = await res.json();

  return (
    <div>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {/*  MISSION  */}
      <div className={styles.missionContainer}>
        <div className={styles.missionStatement}>
          Developing today&apos;s communities and tomorrow&apos;s leaders.
        </div>
        <div className={styles.missionEvents}>
          <div>
            <h1 style={{ textAlign: "center", marginBottom: 30 }}>
              Our Next Event{events.length > 1 ? "s" : ""}
            </h1>
            {events.slice(0, 2).map(({ _id, ...eventDetails }) => {
              const { description } = eventDetails;
              return (
                <EventCard
                  key={_id}
                  {...eventDetails}
                  description={description.slice(0, 100) + "..."}
                />
              );
            })}
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/*  WHAT WE DO  */}
      <LeftDashedBorder topOffset={115}>
        <h3 className={styles.whatWeDoHeader}>WHAT WE DO</h3>
        <div className={styles.whatWeDoContainer}>
          <div className={styles.whatWeDoMainContent}>
            <div className={styles.WhatWeDoSubtitle}>
              WE AIM FOR COMMUNITY SERVICE WITH A SOCIAL
              <span> TWIST</span>.
            </div>
            <p>
              What does that mean? It means members can participate in as many
              or as few volunteer opportunities as they’d like, and at the end
              of the day, they celebrate new friendships. In fact, our turnkey
              events only require one thing – for members to show up! Here’s a
              snapshot of Give Back Cincinnati’s impact:
            </p>
          </div>
          <BulletList
            bullets={[
              "More than 15,000 hours of service donated to-date",
              "500+ houses painted throughout the region",
              "The region's largest Thanksgiving meal",
              "International service in Ghana, Romania, Peru, and beyond",
            ]}
            className={styles.whatWeDoList}
          />
        </div>
      </LeftDashedBorder>

      {/*  WHO WE ARE  */}
      <div className={styles.whoWeAreContainer}>
        {whoWeAreTexts.map((text, i) => (
          <React.Fragment key={i}>
            {i === 3 ? (
              <h2 className={styles.whoWeAreTitle}>WHO WE ARE</h2>
            ) : (
              ""
            )}
            <div className={styles.whoWeAreItem}>{text}</div>
          </React.Fragment>
        ))}
      </div>

      {/*    Upcoming Events   */}
      <div className={styles.upcomingEventsContainer}>
        <h3 className={styles.upcomingEventsTitle}>Upcoming Events</h3>

        {events.map(({ _id, ...eventDetails }) => (
          <EventCard key={_id} {...eventDetails} />
        ))}
        <div className={styles.seeAllEvents}>
          <SeeAllEvents />
        </div>
      </div>

      {/*    VOLUNTEER OPPORTUNITIES */}
      <div className={styles.volunteerOpportunitiesContainer}>
        <h3
        // fontFamily='stylized' fontSize={majorScale(4)} color='gbc-black'
        >
          Volunteer Opportunities
        </h3>
        <div className={styles.opportunityInnerContainer}>
          {volunteerOpportunities.map(({ logo, title, description }) => (
            <div className={styles.opportunity} key={title}>
              <div style={{ backgroundImage: `url(${logo})` }} />
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
