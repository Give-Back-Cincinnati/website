"use client";
import React, { useEffect, useMemo } from "react";
import { Waiver } from "@/components/Events";
import { HorizontalBreak } from "@/components/Backgrounds";
import { DynamicForm } from "@/components/DynamicForm";
import { Spinner, Notify } from "@/components/DataDisplay";
import { Alert } from "@/components/Utils";
import {
  Events,
  useGetMeQuery,
  useGetEventsQuery,
  usePostEventsByEventIdRegisterMutation,
  GuestRegistration,
} from "@/store/api/openApi";
import { useGetSchema } from "hooks";

export default function Registration({ event }: { event: Events }) {
  const { data: eventData } = useGetEventsQuery({ id: event._id });
  const userRegistrationSchema = useGetSchema("UserRegistration");
  const guestRegistrationSchema = useGetSchema("GuestRegistration");
  const { data: me } = useGetMeQuery();

  const [submitRegistration, { status, error, reset, isSuccess }] =
    usePostEventsByEventIdRegisterMutation();

  function handleRegistrationSubmit(itm: Record<string, unknown>) {
    submitRegistration({
      eventId: event._id,
      body: itm as GuestRegistration,
    });
  }

  useEffect(() => {
    if (status === "fulfilled") {
      Notify({ title: "Successfully Registered!", intent: "positive" });
    }

    if (error) {
      reset();
    }
  }, [reset, error, status]);

  const registrationSchema = useMemo(() => {
    const schema = me ? userRegistrationSchema : guestRegistrationSchema;
    if (!schema || !eventData) return schema;

    if (Object.keys(eventData.customFields || {}).length > 0) {
      Object.entries(eventData.customFields || {}).forEach(([key, value]) => {
        if (value.isRequired) {
          schema.required.push(key);
        }
      });
      schema.properties = {
        ...schema.properties,
        ...eventData.customFields,
      };
    }

    if (
      eventData.volunteerCategories &&
      Object.keys(eventData.volunteerCategories || {}).length > 0
    ) {
      const vCatEnum = Object.values(eventData.volunteerCategories || {}).map(
        (cat) => `${cat.name} - ${cat.shift}`
      );
      schema.properties = {
        ...schema.properties,
        volunteerCategory: {
          type: "string",
          enum: vCatEnum,
        },
      };
    } else {
      delete schema.properties.volunteerCategory;
    }

    return schema;
  }, [me, userRegistrationSchema, guestRegistrationSchema, eventData]);

  if (eventData && "isFull" in eventData) {
    return (
      <div>
        <HorizontalBreak>
          This event&apos;s registration is full
        </HorizontalBreak>
      </div>
    );
  }

  return (
    <div>
      <HorizontalBreak>Registration</HorizontalBreak>

      {isSuccess && (
        <Alert
          key="registrationSuccess"
          title="You have successfully registered for this event"
          intent="positive"
        />
      )}

      {registrationSchema && !isSuccess ? (
        <DynamicForm
          entity={registrationSchema}
          onSubmit={handleRegistrationSubmit}
          values={me} // if we add new fields in the future, autopopulate them for logged in users
          hiddenFields={["user"]}
          customFields={eventData ? event.customFields: {}} // pass custom fields from event data
          labelOverrides={{
            hasAgreedToTerms: (_) => <Waiver />,
          }}
          isLoading={status === "pending"}
        />
      ) : (
        ""
      )}
      {!guestRegistrationSchema || !userRegistrationSchema ? <Spinner /> : ""}
    </div>
  );
}
