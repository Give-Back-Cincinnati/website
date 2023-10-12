import React, { useState, ChangeEventHandler, ChangeEvent } from "react";
import type { EntitySchema } from "@/types/schema";
import { DynamicForm } from "..";
import { Button, ErrorBoundary, Modal } from "@/components/Utils";

export default function ObjectEditor({
  values = {},
  ...props
}: {
  propertyKey: string;
  onSave: (val: { recordId?: string; value: Record<string, unknown> }) => void;
  schema: EntitySchema;
  values?: Record<string, unknown>;
  recordId?: string;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {`Add New ${props.propertyKey}`}
      </Button>

      <ErrorBoundary>
        <Modal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
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
            values={values}
            hiddenFields={[]}
            isAdmin
          />
        </Modal>
      </ErrorBoundary>
    </>
  );
}
