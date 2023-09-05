import { useMemo } from "react";
import { Table, Pagination, TextFilter } from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
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

  const {
    items,
    collectionProps,
    filteredItemsCount,
    filterProps,
    paginationProps,
  } = useCollection(formattedEventRegistrations, {
    filtering: {
      fields: ["firstName", "lastName", "email"],
    },
  });

  return (
    <div className={styles.container}>
      <h2>Registrations: {eventRegistrations?.length || 0}</h2>
      {eventRegistrations && (
        <>
          <a href={`mailto:?bcc=${emailList}`}>
            <Button variant="outlined">Email All Registrations</Button>
          </a>
          <Table
            {...collectionProps}
            items={items}
            pagination={<Pagination {...paginationProps} />}
            columnDefinitions={[
              {
                id: "name",
                header: "Name",
                cell: (item) => `${item.firstName} ${item.lastName}`,
              },
              {
                id: "phone",
                header: "Phone",
                cell: (item) => item.phone,
              },
              {
                id: "email",
                header: "Email",
                cell: (item) => item.email,
              },
              {
                id: "dateOfBirth",
                header: "Date of Birth",
                cell: (item) => item.dateOfBirth,
              },
              {
                id: "hasAgreedToTerms",
                header: "Agreed to Terms",
                cell: (item) => item.hasAgreedToTerms,
              },
              {
                id: "eContact",
                header: "Emergency Contact",
                cell: (item) => (
                  <>
                    <div>{item.eContactName}</div>
                    <div>{item.eContactPhone}</div>
                  </>
                ),
              },
              {
                id: "customFields",
                header: "Custom Fields",
                cell: (item) => {
                  if (!event || !event?.customFields) return "Loading...";

                  if (item.customFields) {
                    return (
                      <>
                        {Object.entries(item.customFields).map(
                          ([key, value]) => {
                            return (
                              <div key={key} className={styles.customFields}>
                                <span>
                                  {event.customFields && event.customFields[key]
                                    ? event.customFields[key].name
                                    : "Deleted"}
                                  :
                                </span>
                                {value as string}
                              </div>
                            );
                          }
                        )}
                      </>
                    );
                  }
                  return "Not Found";
                },
              },
              {
                id: "delete",
                header: "Delete",
                cell: (item) => item.delete,
              },
              {
                id: "checkedIn",
                header: "Check In",
                cell: (item) => item.checkedIn,
              },
            ]}
            filter={
              <TextFilter
                {...filterProps}
                countText={(filteredItemsCount || items.length).toString()}
                filteringAriaLabel="Filter"
              />
            }
            stickyColumns={{ first: 1, last: 1 }}
            stripedRows
            variant="embedded"
          />
        </>
      )}
    </div>
  );
};
