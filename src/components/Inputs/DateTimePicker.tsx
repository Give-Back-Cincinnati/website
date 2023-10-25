import React, {
  useRef,
  ComponentPropsWithoutRef,
  ChangeEventHandler,
} from "react";
import { DateTime } from "luxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormatInputLabel } from "hooks";

export interface DateTimePickerProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: string;
  label?: string | JSX.Element;
  fullWidth?: boolean;
  error?: boolean;
  errorText?: string;
}

export const DateTimePicker = ({
  name,
  label,
  value,
  onChange,
  type = "datetime-local",
  error = false,
  errorText,
  fullWidth = false,
  min = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
  ...props
}: DateTimePickerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const formattedLabel = useFormatInputLabel({ label, name });

  function handleChange(value: unknown) {
    const date = value as DateTime;
    const event = {
      target: ref.current,
    } as React.ChangeEvent<HTMLInputElement>;
    event.target.value = date.toFormat("yyyy-MM-dd");
    onChange(event);
  }

  return (
    <DatePicker
      sx={{
        textTransform: "capitalize",
      }}
      slotProps={{
        field: {
          // @ts-expect-error
          color: "secondary",
          name,
          style: {
            backgroundColor: "rgba(51, 51, 51, 0.07)",
          },
        },
      }}
      label={formattedLabel}
      inputRef={ref}
      onAccept={handleChange}
      onChange={handleChange}
    />
  );
};
