"use client";
import { useState, useEffect, useMemo } from "react";
import { NextPageWithLayout } from "pages/_app";
import Link from "next/link";
// import { Table } from '@/components/DataDisplay'
import Table from "@cloudscape-design/components/table";
import CollectionPreferences, {
  CollectionPreferencesProps,
} from "@cloudscape-design/components/collection-preferences";
import Box from "@cloudscape-design/components/box";
import TextContent from "@cloudscape-design/components/text-content";
import Badge from "@cloudscape-design/components/badge";
import Header from "@cloudscape-design/components/header";
import { useCollection } from "@cloudscape-design/collection-hooks";
import { AdminLayout } from "layouts/AdminLayout";
import { useGetSchema, useUserHasPermission } from "hooks";
import { Notify } from "@/components/DataDisplay";
import { Button, Modal, Confirm } from "@/components/Utils";

import {
  useSearchEventsQuery,
  useSearchRegistrationsQuery,
  useCreateEventsMutation,
  useDeleteEventsMutation,
  Events,
} from "@/store/api/openApi";
import { DynamicForm } from "@/components/DynamicForm";
import { DateTime } from "luxon";
import { Pagination, TextFilter } from "@cloudscape-design/components";

const EventsAdmin: NextPageWithLayout = () => {
  const [isOpen, setOpen] = useState(false);
  // const [ selectedItem, setSelectedItem ] = useState<Events | null>(null)
  const schema = useGetSchema("Events");
  const {
    isSuccess,
    data: events,
    refetch,
  } = useSearchEventsQuery({ limit: 0 });
  const { data: registrationInformation } = useSearchRegistrationsQuery({});
  const canSeeEvents = useUserHasPermission("events.get");
  const canCreateEvent = useUserHasPermission("events.post");
  const canDeleteEvent = useUserHasPermission("events.id.delete");
  const [addEvent, { status, error, reset }] = useCreateEventsMutation();
  const [
    deleteEvent,
    { status: deleteStatus, error: deleteError, reset: deleteReset },
  ] = useDeleteEventsMutation();
  const [preferences, setPreferences] =
    useState<CollectionPreferencesProps.Preferences>({
      pageSize: 10,
      wrapLines: true,
      stickyColumns: { first: 1, last: 0 },
    });

  const formattedEventRegistrations = useMemo(() => {
    if (!registrationInformation) return {};
    return registrationInformation.reduce(
      (acc: Record<string, number>, { _id, numRegistrations }) => {
        acc[_id] = numRegistrations;
        return acc;
      },
      {}
    );
  }, [registrationInformation]);

  useEffect(() => {
    if (status === "fulfilled") {
      setOpen(false);
      reset();
      refetch();
      Notify({ title: "Event Created", intent: "positive" });
    }

    if (error) {
      reset();
    }
  }, [status, reset, refetch, error]);

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      deleteReset();
      refetch();
      Notify({ title: "Event Deleted", intent: "warning" });
    }
    if (deleteError) {
      deleteReset();
      Notify({ title: (deleteError as Error).message, intent: "negative" });
    }
  }, [deleteReset, deleteStatus, deleteError, refetch]);

  function handleCreateEventSubmit(data: Record<string, unknown>): void {
    const newEvent = data as Events;
    addEvent({
      events: newEvent,
    });
  }

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(events || [], {
    filtering: {
      empty: "",
      noMatch: "No events match your search",
    },
    sorting: {},
    selection: {},
  });

  return (
    <div>
      {events && canSeeEvents ? (
        <Table
          {...collectionProps}
          header={
            <Header
              counter={
                filteredItemsCount ? `(${filteredItemsCount?.toString()})` : ""
              }
              actions={
                canCreateEvent &&
                schema && (
                  <>
                    <Button onClick={() => setOpen(true)}>Create Event</Button>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={() => setOpen(false)}
                    >
                      <DynamicForm
                        entity={schema}
                        onSubmit={handleCreateEventSubmit}
                        isLoading={status === "pending"}
                        hiddenFields={["customFields"]}
                      />
                    </Modal>
                  </>
                )
              }
            >
              Events
            </Header>
          }
          visibleColumns={preferences.visibleContent}
          columnDefinitions={[
            {
              id: "name",
              header: "Name",
              cell: (e) => (
                <>
                  <TextContent>
                    <Link href={`/admin/events/${e._id}`} prefetch={false}>
                      {e.name}
                    </Link>
                  </TextContent>
                  <Badge>{e.category}</Badge>
                </>
              ),
            },
            { id: "category", header: "Category", cell: (e) => e.category },
            {
              id: "dateTime",
              header: "Date & Time",
              cell: (e) => (
                <>
                  <Box>
                    Starts:{" "}
                    {DateTime.fromISO(e.startTime).toLocaleString(
                      DateTime.DATETIME_MED_WITH_WEEKDAY
                    )}
                  </Box>
                  <Box>
                    Ends:{" "}
                    {DateTime.fromISO(e.endTime).toLocaleString(
                      DateTime.DATETIME_MED_WITH_WEEKDAY
                    )}
                  </Box>
                </>
              ),
            },
            {
              id: "registrations",
              header: "Num Registrants",
              cell: (e) => e._id && formattedEventRegistrations[e._id],
            },
            {
              id: "maxRegistrations",
              header: "Max Registrants",
              cell: (e) => e.maxRegistrations,
            },
          ]}
          preferences={
            <CollectionPreferences
              confirmLabel="Confirm"
              onConfirm={({ detail }) => setPreferences(detail)}
              preferences={preferences}
              contentDisplayPreference={{
                title: "Visible Columns",
                options: [
                  { id: "name", label: "Name", alwaysVisible: true },
                  { id: "dateTime", label: "Date & Time" },
                  {
                    id: "registrations",
                    label: "Num Registrants",
                  },
                  {
                    label: "Category",
                    id: "category",
                  },
                  {
                    label: "Max Registrants",
                    id: "maxRegistrations",
                  },
                ],
              }}
            />
          }
          items={items}
          selectionType="single"
          filter={<TextFilter {...filterProps} />}
          pagination={<Pagination {...paginationProps} />}
          variant="embedded"
        />
      ) : (
        ""
      )}
    </div>
  );
};

EventsAdmin.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default EventsAdmin;
