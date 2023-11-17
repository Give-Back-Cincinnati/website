"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
  ChangeEventHandler,
} from "react";
import { EntitySchema } from "@/types/schema";

import styles from "./DynamicForm.module.scss";

import {
  CheckBox,
  DateTimePicker,
  Select,
  TextField,
  TextArea,
} from "@/components/Inputs";
import { Button, Paper } from "../Utils";
import { DateTime } from "luxon";
import { Table } from "../DataDisplay";
import ObjectEditor from "./ObjectEditor";
import { nanoid } from "nanoid";

export interface DynamicFormProps {
  entity: EntitySchema;
  onSubmit: (state: Record<string, unknown>) => void;
  values?: Record<string, unknown>;
  hiddenFields?: string[];
  labelOverrides?: Record<string, (label: string) => string | JSX.Element>;
  isLoading?: boolean;
  isProtected?: boolean;
  hideSubmit?: boolean;
  submitLabel?: string;
  isAdmin?: Boolean;
}

export const DynamicForm = ({
  entity,
  onSubmit,
  values = {},
  hiddenFields = [],
  labelOverrides = {},
  isLoading = false,
  isProtected = false,
  hideSubmit = false,
  submitLabel = "Submit",
  isAdmin = false,
}: DynamicFormProps) => {
  // Derive the initial and empty states so they can be used in the created inputs
  const { initialState } = useMemo(() => {
    const { properties } = entity;
    const emptyState: Record<string, unknown> = {};
    Object.keys(properties).forEach((propertyKey) => {
      const property = properties[propertyKey];
      if (property.readonly || hiddenFields.includes(propertyKey)) return;

      switch (property.type) {
        case "number":
          emptyState[propertyKey] = values[propertyKey] || 0;
          break;
        case "string":
          // select
          if ("enum" in property && Array.isArray(property.enum)) {
            emptyState[propertyKey] = values[propertyKey] || property.enum[0];
            break;
          }
          // date
          if ("format" in property && property.format === "date-time") {
            emptyState[propertyKey] =
              DateTime.fromISO(values[propertyKey] as string) || DateTime.now();
            break;
          }
          if ("format" in property && property.format === "date") {
            emptyState[propertyKey] =
              DateTime.fromISO(values[propertyKey] as string) || DateTime.now();
            break;
          }
          emptyState[propertyKey] = values[propertyKey] || "";
          break;
        // string
        case "boolean":
          emptyState[propertyKey] = values[propertyKey] || false;
          break;
        case "array":
          emptyState[propertyKey] = values[propertyKey] || [];
          break;
        case "object":
          emptyState[propertyKey] = values[propertyKey] || {};
          break;
        default:
          emptyState[propertyKey] = values[propertyKey] || "";
      }
    });
    return { initialState: emptyState };
  }, [entity, values, hiddenFields]);

  const [formState, setFormState] = useState(initialState);
  const [editingObject, setEditingObject] =
    useState<
      | (Record<string, string | number | boolean> & {
          propertyKey: string;
          recordId?: string;
        })
      | undefined
    >();

  const handleSubmit = useCallback(() => {
    const outputState = { ...formState };
    // loop through state on submit to make sure to include timezone data in any datetime-local
    const { properties } = entity;
    Object.keys(properties).forEach((propertyKey) => {
      const property = properties[propertyKey];
      switch (property.type) {
        case "string":
          // date
          if (
            "format" in property &&
            property.format === "date-time" &&
            typeof formState[propertyKey] === "string"
          ) {
            outputState[propertyKey] = DateTime.fromISO(
              outputState[propertyKey] as string
            ).toISO();
            break;
          }
          if (
            "format" in property &&
            property.format === "date" &&
            typeof formState[propertyKey] === "string"
          ) {
            outputState[propertyKey] = DateTime.fromISO(
              outputState[propertyKey] as string
            ).toISODate();
            break;
          }
          if (
            "enum" in property &&
            Array.isArray(property.enum) &&
            outputState[propertyKey] === ""
          ) {
            outputState[propertyKey] = property.enum[0];
            break;
          }
          break;
        case "number":
          outputState[propertyKey] = Number(outputState[propertyKey]);
          break;
        case "array":
          outputState[propertyKey] = (outputState[propertyKey] as string).split(
            "\n"
          );
        default:
          break;
      }
    });
    onSubmit(outputState);
  }, [formState, onSubmit, entity]);

  const handleChangeEvent: ChangeEventHandler = useCallback(
    (e) => {
      const { target, altType } = e as React.ChangeEvent<HTMLInputElement> & {
        altType?: string;
      };
      if (target) {
        const { name, value, checked, type } = target;
        const date = DateTime.fromISO(value);
        if (date.isValid && altType?.includes("date")) {
          setFormState({ ...formState, [name]: date });
        } else if (type === "checkbox") {
          setFormState({ ...formState, [name]: checked });
        } else if (name in formState) {
          setFormState({ ...formState, [name]: value });
        }
      }
    },
    [formState]
  );

  const handleArrChangeEvent = useCallback(
    (name: string, e: Record<string, any>, index?: number) => {
      setFormState((formState) => {
        const arr = formState[name] as Record<string, any>[];
        if (Array.isArray(arr)) {
          index ??= (formState[name] as Record<string, any>[]).length;
          arr[index] = e;
          return { ...formState, [name]: arr };
        }
        return formState;
      });
    },
    []
  );

  const deleteFromArr = useCallback((index: number, name: string) => {
    setFormState((formState) => {
      const arr = formState[name] as Record<string, any>[];
      if (Array.isArray(arr)) {
        arr.splice(index, 1);
        return { ...formState, [name]: arr };
      }
      return formState;
    });
  }, []);

  const inputs = useMemo(() => {
    const { required = [], properties } = entity;
    return Object.keys(properties).map((propertyKey) => {
      const property = properties[propertyKey];
      // if property is read only, we don't want the user to see it presented in the form
      if (property.readonly || hiddenFields.includes(propertyKey)) return "";
      const isRequired = required.includes(propertyKey);
      const formValue = formState[propertyKey];

      let label: string | undefined | JSX.Element = property.name;
      if (labelOverrides[propertyKey]) {
        label = labelOverrides[propertyKey](propertyKey);
      }

      let content: ReactElement | "" = "";
      switch (property.type) {
        case "boolean":
          if (typeof formState[propertyKey] === "boolean") {
            content = (
              <CheckBox
                name={propertyKey}
                label={label}
                checked={formValue as boolean} // this is created as a boolean in initialState construction
                onChange={handleChangeEvent}
                required={isRequired}
              />
            );
          }
          break;
        case "string":
          // Generate a Select field from enum values
          if ("enum" in property && Array.isArray(property.enum)) {
            const selectOptions = property.enum.map((option) => ({
              _id: option,
            }));
            content = (
              <Select
                value={formValue as string}
                options={selectOptions}
                name={propertyKey}
                label={label}
                onChange={handleChangeEvent}
                required={isRequired}
              />
            );
            break;
          }
          // Generate a datetime picker
          if ("format" in property && property.format === "date-time") {
            content = (
              <DateTimePicker
                name={propertyKey}
                label={label}
                value={formValue as DateTime}
                onChange={handleChangeEvent}
                required={isRequired}
              />
            );
            break;
          }
          // Generate a date picker
          if ("format" in property && property.format === "date") {
            content = (
              <DateTimePicker
                name={propertyKey}
                label={label}
                value={formValue as DateTime}
                onChange={handleChangeEvent}
                required={isRequired}
                type="date"
              />
            );
            break;
          }

          if (property.maxLength && property.maxLength > 40) {
            content = (
              <TextArea
                {...property}
                value={formValue as string}
                name={propertyKey}
                label={label}
                onChange={handleChangeEvent}
                required={isRequired}
              />
            );
            break;
          }
          // Generic text field
          content = (
            <TextField
              {...property}
              value={formValue as string}
              name={propertyKey}
              label={label}
              onChange={handleChangeEvent}
              required={isRequired}
            />
          );
          break;
        case "array":
          const arrItems = property.items;
          if (arrItems) {
            if ("properties" in arrItems) {
              if (typeof arrItems === "string") {
              }
              const arr = (formValue as []).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className={styles.arrHeader}>
                      <h3>Item: {(index + 1).toString()}</h3>
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() => deleteFromArr(index, propertyKey)}
                      >
                        Delete
                      </Button>
                    </div>
                    <DynamicForm
                      submitLabel="Save"
                      onSubmit={(itmVal) =>
                        handleArrChangeEvent(propertyKey, itmVal, index)
                      }
                      entity={arrItems}
                      values={item}
                    />
                  </React.Fragment>
                );
              });

              arr.push(
                <React.Fragment key="new">
                  <h3>New Item</h3>
                  <DynamicForm
                    submitLabel="Save"
                    onSubmit={(itmVal) =>
                      handleArrChangeEvent(propertyKey, itmVal)
                    }
                    entity={arrItems}
                  />
                </React.Fragment>
              );
              content = (
                <Paper elevation={4}>
                  <>{arr}</>
                </Paper>
              );
            }
            content = (
              <TextArea
                {...property}
                value={formValue as string}
                name={propertyKey}
                label={label}
                onChange={handleChangeEvent}
                required={isRequired}
                errorText="Enter each option on a new line or leave blank for a text field"
              />
            );
          }
          break;
        default:
          // if its a nested object, render a special version of the form inside a modal
          if (property.type === "object" && property.additionalProperties) {
            const objectShape = (
              formState[propertyKey] as Record<string, object>
            )[Object.keys(formState[propertyKey] as Record<string, object>)[0]];

            content = (
              <div>
                <h3>{propertyKey}</h3>
                <>
                  {/* This is being rendered 2x because of VolCat and CustomFields */}
                  <ObjectEditor
                    propertyKey={propertyKey}
                    onSave={(val) => {
                      const id: string = val.recordId || nanoid();
                      const newFormState = {
                        ...formState,
                        [propertyKey]: {
                          ...(formState[propertyKey] as Record<
                            string,
                            unknown
                          >),
                          [id]: val.value,
                        },
                      };
                      setEditingObject(undefined);
                      setFormState(newFormState);
                    }}
                    values={editingObject}
                    recordId={editingObject?.recordId}
                    schema={property.additionalProperties}
                  />
                  {isAdmin &&
                    objectShape &&
                    formState[propertyKey] &&
                    typeof formState[propertyKey] === "object" && (
                      <Table
                        keys={[...Object.keys(objectShape), "actions"]}
                        data={Object.entries(
                          formState[propertyKey] as Record<
                            string,
                            Record<string, string | number | boolean>
                          >
                        ).map(([key, val]) => ({ ...val, actions: key }))}
                        formatFunctions={{
                          enum: (val) => val.join(),
                          capacity: (val) => val.toString(),
                          actions: (val) => (
                            <>
                              <Button
                                onClick={() => {
                                  const obj = (
                                    formState[propertyKey] as Record<
                                      string,
                                      Record<string, string | number | boolean>
                                    >
                                  )[val];
                                  setEditingObject({
                                    ...obj,
                                    recordId: val,
                                    propertyKey,
                                  });
                                }}
                              >
                                Edit
                              </Button>
                            </>
                          ),
                        }}
                      />
                    )}
                </>
              </div>
            );
            break;
          }
          content = (
            <TextField
              value={formValue as string}
              name={propertyKey}
              label={label}
              onChange={handleChangeEvent}
              required={isRequired}
            />
          );
      }

      return (
        <div key={propertyKey} className={styles.fieldContainer}>
          {content}
        </div>
      );
    });
  }, [
    entity,
    hiddenFields,
    formState,
    labelOverrides,
    handleChangeEvent,
    deleteFromArr,
    handleArrChangeEvent,
    isAdmin,
    editingObject,
  ]);

  // if we are hiding the submit button, we want to submit the form on change
  //   to allow the parent element to handle the change
  useEffect(() => {
    if (hideSubmit) {
      handleSubmit();
    }
  }, [formState, hideSubmit, handleSubmit]);

  return (
    <div className={styles.container}>
      {inputs}
      {isProtected && (
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAAAkh6TU2qJvk6ao"
        ></div>
      )}
      {hideSubmit || (
        <Button onClick={handleSubmit} isLoading={isLoading}>
          {submitLabel}
        </Button>
      )}
    </div>
  );
};
