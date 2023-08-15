import { useMemo } from "react";
import { DateTime } from "luxon";

import styles from "./index.module.scss";

interface EventDetails {
  startTime: string;
  endTime: string;
  address: string;
}

export const EventDetails = ({ startTime, endTime, address }: EventDetails) => {
  const { timeString, dateString } = useMemo(() => {
    const startDateTimeLuxon =
      DateTime.fromISO(startTime).setZone("America/New_York");
    const endDateTimeLuxon =
      DateTime.fromISO(endTime).setZone("America/New_York");
    const timeString = `${startDateTimeLuxon.toLocaleString(
      DateTime.TIME_SIMPLE
    )} - ${endDateTimeLuxon.toLocaleString(DateTime.TIME_SIMPLE)}`;
    const dateString = startDateTimeLuxon.toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    );

    return { timeString, dateString };
  }, [startTime, endTime]);

  return (
    <div className={styles.container}>
      <h2>EVENT DETAILS</h2>
      <div className={styles.detail}>
        <span>Date:</span>
        <span>{dateString}</span>
      </div>
      <div className={styles.detail}>
        <span>Time:</span>
        <span>{timeString}</span>
      </div>
      <div className={styles.detail}>
        <span>Location:</span>
        <span>{address}</span>
      </div>
    </div>
  );
};
