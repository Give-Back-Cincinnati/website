"use client";
import React, { useState, useEffect } from "react";
import type { EntitySchema } from "@/types/schema";
import { DynamicForm } from "..";
import { Button, ErrorBoundary, Modal } from "@/components/Utils";

export default function ObjectEditor(props: {
  propertyKey: string;
  onSave: (val: { recordId?: string; value: Record<string, unknown> }) => void;
  schema: EntitySchema;
  values?: Record<string, string | number | boolean> & {
    propertyKey: string;
    recordId?: string;
  };
  recordId?: string;
}) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (props.values && props.values.propertyKey === props.propertyKey) {
      setOpen(true);
    }
  }, [setOpen, props.values, props.propertyKey]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {`Add New ${props.propertyKey}`}
      </Button>

      <ErrorBoundary>
        <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
          <>
            {isOpen && (
              <DynamicForm
                entity={props.schema}
                onSubmit={(value) => {
                  props.onSave({
                    value,
                    recordId: props.recordId,
                  }),
                    setOpen(false);
                }}
                submitLabel="Save"
                values={props.values}
                hiddenFields={[]}
                isAdmin
              />
            )}
          </>
        </Modal>
      </ErrorBoundary>
    </>
  );
}
