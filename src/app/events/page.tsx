import React from "react";
import styles from "./index.module.scss";

import { EventHeader, EventCard } from "@/components/Events";

import type { SearchEventsApiResponse } from "@/store/api/openApi";

export const runtime = "edge";

export default async function Page() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/events?endTime%5B%24gt%5D=${new Date().toLocaleDateString()}&sort=startTime&order=asc`
  );
  const events: SearchEventsApiResponse = await res.json();

  const eventMap: Record<string, SearchEventsApiResponse> = {};
  let categories: string[] = [];

  events.forEach((event) => {
    if (event.category) {
      event.description = event.description.slice(0, 100) + "...";
      if (eventMap[event.category]) {
        eventMap[event.category].push(event);
      } else {
        eventMap[event.category] = [event];
        categories.push(event.category);
      }
    }
  });

  categories = categories.sort();

  return (
    <>
      <EventHeader />

      <div className={styles.container}>
        <div className={styles.tagline}>
          <h2>Interested in giving back, getting out, and joining the fun?</h2>

          <p>
            You&apos;re in luck - with Give Back Cincinnati, there&apos;s
            something for everyone! See below for our events... but keep in
            mind, specific event details may not be available yet
          </p>
        </div>

        <div className={styles.eventsContainer}>
          {categories.length === 0 ? (
            <div>No events currently scheduled</div>
          ) : (
            ""
          )}
          {categories.map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              {eventMap[category].map((event) => (
                <EventCard
                  key={event._id}
                  {...event}
                  opts={{ dateHasBorder: true }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
