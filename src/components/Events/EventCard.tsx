"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

import styles from "./EventCard.module.scss";
import { Events } from "@/store/api/openApi";

export interface EventCardProps extends Events {
  opts?: {
    dateHasBorder: boolean;
  };
}

export const EventCard = ({
  startTime,
  name,
  slug,
  description,
  opts = { dateHasBorder: false },
}: EventCardProps) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(`/events/${slug}`);
      }}
    >
      <h3
        className={`${styles.date} ${
          opts.dateHasBorder ? styles.dateHasBorder : ""
        }`}
      >
        {DateTime.fromISO(startTime || "").toLocaleString(DateTime.DATE_MED)}
      </h3>
      <h1 className={styles.title}>{name}</h1>
      {description ? <p className={styles.description}>{description}</p> : ""}
      <div className={styles.learnMore}>
        <p>Learn More</p>
      </div>
    </div>
  );
};
