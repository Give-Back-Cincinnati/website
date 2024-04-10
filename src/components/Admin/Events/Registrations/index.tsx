import React, { useMemo, useState } from "react";
import { Table } from "@/components/DataDisplay";
import { CheckIn } from "./CheckIn";
import { Delete } from "./Delete";
import { Modal } from "@/components/Utils";

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

const checkIfOver21 = (timestamp: string) => {
  const currentDate = new Date();
  const date21YearsAgo = new Date(
    currentDate.getFullYear() - 21,
    currentDate.getMonth(),
    currentDate.getDate()
  );  
  const inputDate = new Date(timestamp);  
  return inputDate < date21YearsAgo;
}

export const AdminEventRegistrations = ({
  eventId,
}: AdminEventRegistrationsProps) => {
  const { data: users } = useSearchUsersQuery({ limit: 0 }); // limit 0 will return all users
  const { data: event } = useGetEventsQuery({ id: eventId });
  const { data: eventRegistrations } = useGetEventsByEventIdRegisterQuery({
    eventId,
    limit: 0,
  });

  const [ columns, setColumns ] = useState<{[key: string]: { label: string, isVisible: boolean, isExportable: boolean }}>({
    firstName: { label: "First Name", isVisible: true, isExportable: true }, 
    lastName: { label: "Last Name", isVisible: true, isExportable: true }, 
    phone: { label: "Phone Number", isVisible: false, isExportable: true }, 
    email: { label: "Email", isVisible: false, isExportable: true }, 
    dateOfBirth: { label: "Date of Birth", isVisible: true, isExportable: true  }, 
    isOver21: { label: "Over 21?", isVisible: true, isExportable: true },
    hasAgreedToTerms: { label: "Has Agreed To Terms", isVisible: true, isExportable: true  }, 
    firstEvent: { label: "First Event", isVisible: true, isExportable: true  },  
    eContactName: { label: "Emergency Contact Name", isVisible: false, isExportable: true  }, 
    eContactPhone: { label: "Emergency Contact Phone", isVisible: false, isExportable: true  }, 
    volunteerCategory: { label: "Volunteer Category", isVisible: false, isExportable: true  }, 
    customFields: { label: "Custom Fields", isVisible: true, isExportable: true  }, 
    createdAt: { label: "Sign-up Time", isVisible: false, isExportable: true },
    checkedIn: { label: "Checked In", isVisible: true, isExportable: true  }, 
    delete: { label: "Delete", isVisible: true, isExportable: false  }, 
  })

  const [ isEditingTable, setIsEditingTable ] = useState<boolean>(false);

  const exportableKeys = Object.entries(columns).reduce((keyArr, [key, data]) => {
    data.isExportable ? keyArr.push(key) : {}
    return keyArr
  }, Array())

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
        ...{ isOver21: checkIfOver21(registration.dateOfBirth) },
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
          exportableKeys
            .map((key) => {
                switch (typeof registration[key]) {
                  case "object":
                    if (key === "hasAgreedToTerms") {
                      return String(
                        (registration[key] as React.ReactElement).props.checked
                      );
                    } else if (key === "checkedIn") {
                      return String(
                        (registration[key] as React.ReactElement).props.registration.checkedIn 
                      )
                    } else if (key === "customFields") {
                      if (event && event.customFields) {
                        let customFieldsData = "";
                        const cfKeys: string[] = Object.keys(event.customFields);
                        cfKeys.forEach((cfKey, idx) => {
                          customFieldsData += `${event.customFields![cfKey].name}: ${Object(registration["customFields"])[cfKey]}`;
                          customFieldsData += (idx < (cfKeys.length - 1)) ? " || " : ""
                        })
                        return customFieldsData;
                      } else {
                        return ""
                      }               
                    }
                    break;
                  default:
                    return String(registration[key]);
                }
            })
            .join(",")
        );
        return acc;
      }, [ exportableKeys.join(",") ]
    );
    const blob = new Blob([data.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    return URL.createObjectURL(blob);
  }, [formattedEventRegistrations]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
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

            <Button variant="outlined" onClick={() => setIsEditingTable(true)}>
              Edit Table View
            </Button>
            <Modal
                isOpen={isEditingTable}
                onRequestClose={() => setIsEditingTable(false)}
            >
              <>
                <h3>Add/Remove Columns from Table View</h3>
                <br/>
                {
                  Object.entries(columns).map(([ key, data ]) => {
                    return ( 
                      <div key={key}>
                        <CheckBox
                          name={`toggle-${key}-visibility`}
                          label={data.label}
                          checked={data.isVisible}
                          onChange={() => setColumns(prevColumns => {
                            return {
                              ...prevColumns,
                              [key]: { label: data.label, isVisible: !data.isVisible, isExportable: data.isExportable }
                            }
                          })}
                        />
                        <br/>
                      </div>
                    )
                  })
                }
              </>
            </Modal>
          </div>
          <br/>
          <div style={{ width: "100%", display: "flex", marginLeft: "auto", marginRight: "auto" }}>
            <Table
              keys={
                Object.entries(columns).reduce((keyArr, [key, data]) => {
                  data.isVisible ? keyArr.push(key) : {}
                  return keyArr;
                }, Array())
              }
              keyLabelMapping={
                Object.entries(columns).reduce((obj, [key, data]) => {
                  data.isVisible ? obj[key] = data.label : {}
                  return obj
                }, Object())
              }
              data={formattedEventRegistrations}
              formatFunctions={{
                dateOfBirth: (val) =>
                  DateTime.fromISO(val).toLocaleString(DateTime.DATE_SHORT),
                createdAt: (val) => 
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
          </div>
        </>
      )}
    </div>
  );
};
