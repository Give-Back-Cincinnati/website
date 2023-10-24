import { useMemo, useCallback } from "react";
import { Table } from "@/components/DataDisplay";
import { CheckIn } from "./CheckIn";
import { Delete } from "./Delete";
import {
  useSearchUsersQuery,
  useGetEventsByEventIdRegisterQuery,
  useGetEventsQuery,
  Users,
} from "@/store/api/openApi";
import { CheckBox } from "@/components/Inputs";
import { Button } from "@/components/Utils";
import { DateTime } from "luxon";

import styles from "./index.module.scss";

export type AdminEventRegistrationsProps = {
  eventId: string;
};

export const AdminEventRegistrations = ({
  eventId,
}: AdminEventRegistrationsProps) => {
  const { data: users } = useSearchUsersQuery({ limit: 0 }); // limit 0 will return all users
  const { data: event } = useGetEventsQuery({ id: eventId });
  const { data: eventRegistrations } = useGetEventsByEventIdRegisterQuery({
    eventId,
    limit: 0,
  });

  const formattedUsers = useMemo(() => {
    if (!users) return {};
    return users.reduce((acc: Record<string, Users>, user: Users) => {
      if (user._id) {
        acc[user._id] = user;
      }
      return acc;
    }, {});
  }, [users]);

  const formattedEventRegistrations = useMemo(() => {
    if (!eventRegistrations) return [];

    return eventRegistrations.map((registration) => {
      let user: {} | Users = {};
      if ("user" in registration && typeof registration.user === "string") {
        user = formattedUsers[registration.user];
      }

      return {
        ...registration,
        ...user,
        hasAgreedToTerms: (
          <CheckBox
            name=""
            label={registration.hasAgreedToTerms.toString()}
            checked={registration.hasAgreedToTerms}
            disabled
            onChange={() => {}}
          />
        ),
        checkedIn: <CheckIn eventId={eventId} registration={registration} />,
        delete: <Delete eventId={eventId} registration={registration} />,
      };
    });
  }, [eventRegistrations, formattedUsers, eventId]);

  const emailList = useMemo(() => {
    return formattedEventRegistrations
      .map((registration) => registration.email)
      .join();
  }, [formattedEventRegistrations]);

  const downloadData = useMemo(() => {
    if (!formattedEventRegistrations.length) return "";
    const data = formattedEventRegistrations.reduce(
      (acc, registration: Record<string, unknown>) => {
        acc.push(
          [
            "firstName",
            "lastName",
            "phone",
            "email",
            "dateOfBirth",
            "hasAgreedToTerms",
            "eContactName",
            "eContactPhone",
            "volunteerCategory",
            "customFields",
          ]
            .map((key) => {
              switch (typeof registration[key]) {
                case "object":
                  break;
                case "boolean":
                  return registration[key] ? "true" : "false";
                default:
                  return String(registration[key]);
              }
            })
            .join(",")
        );
        return acc;
      },
      [
        [
          "firstName",
          "lastName",
          "phone",
          "email",
          "dateOfBirth",
          "hasAgreedToTerms",
          "eContactName",
          "eContactPhone",
          "volunteerCategory",
          "customFields",
        ].join(","),
      ]
    );
    const blob = new Blob([data.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    return URL.createObjectURL(blob);
  }, [formattedEventRegistrations]);

  return (
    <div>
      <h2>Registrations: {eventRegistrations?.length || 0}</h2>
      {eventRegistrations && (
        <>
          <div className={styles.actionButtons}>
            <a href={`mailto:?bcc=${emailList}`}>
              <Button variant="outlined">Email All Registrations</Button>
            </a>
            <a
              download={`${(event && event.name) || "registrations"}.csv`}
              href={downloadData}
            >
              <Button variant="outlined">Download</Button>
            </a>
          </div>
          <Table
            keys={[
              "firstName",
              "lastName",
              "phone",
              "email",
              "dateOfBirth",
              "hasAgreedToTerms",
              "eContactName",
              "eContactPhone",
              "volunteerCategory",
              "customFields",
              "checkedIn",
              "delete",
            ]}
            data={formattedEventRegistrations}
            formatFunctions={{
              dateOfBirth: (val) =>
                DateTime.fromISO(val).toLocaleString(DateTime.DATE_SHORT),
              customFields: (val) => {
                if (!event || !event?.customFields) return "Loading...";

                if (event.customFields) {
                  return (
                    <>
                      {Object.entries(val).map(([key, value]) => (
                        <div key={key} className={styles.customFields}>
                          <span>
                            {event.customFields && event.customFields[key]
                              ? event.customFields[key].name
                              : "Deleted"}
                            :
                          </span>
                          {value as string}
                        </div>
                      ))}
                    </>
                  );
                }
                return "Not Found";
              },
            }}
          />
        </>
      )}
    </div>
  );
};
