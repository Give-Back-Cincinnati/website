import React from "react";
import styles from "./[slug].module.scss";
import { EventHeader, EventDetails } from "@/components/Events";
import Registration from "./registration";
import { Events } from "@/store/api/openApi";

export const runtime = "edge";

export async function generateStaticParams() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/events?endTime%5B%24gt%5D=${new Date().toLocaleDateString()}`
  );
  const events: Events[] = await res.json();
  return events.map((event) => ({ slug: event.slug }));
}

export default async function Event(props: { params: { slug: string } }) {
  const params = new URLSearchParams({
    slug: props.params.slug || "",
  }).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params}`
  );
  const [event]: Events[] = await res.json();

  return (
    <div>
      <EventHeader title={event.name} category={event.category} />
      <div className={styles.detailsContainer}>
        <EventDetails
          startTime={event.startTime}
          endTime={event.endTime}
          address={event.address}
        />

        <div
          className={styles.details}
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </div>

      <Registration event={event} />
    </div>
  );
}
