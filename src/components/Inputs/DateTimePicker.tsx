import React, {
  useRef,
  ComponentPropsWithoutRef,
  ChangeEventHandler,
} from "react";
import { DateTime } from "luxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useFormatInputLabel } from "hooks";

export interface DateTimePickerProps
  extends Omit<ComponentPropsWithoutRef<"input">, "value"> {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: DateTime;
  type?: string;
  label?: string | JSX.Element;
  fullWidth?: boolean;
  error?: boolean;
  errorText?: string;
}

export const DateTimePicker = ({
  name,
  label,
  value = DateTime.now(),
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
    const event = {
      target: ref.current,
      altType: type,
    } as React.ChangeEvent<HTMLInputElement> & { altType: string };
    event.target.value = value as string; // this is actually a DateTime object
    onChange(event);
  }

  if (type === "date") {
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
        value={value}
        onAccept={handleChange}
        onChange={handleChange}
      />
    );
  } else {
    return (
      <MuiDateTimePicker
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
        value={value}
        label={formattedLabel}
        inputRef={ref}
        onAccept={handleChange}
        onChange={handleChange}
      />
    );
  }
};
