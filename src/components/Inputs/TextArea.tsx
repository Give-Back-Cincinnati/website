import React, {
  useRef,
  ComponentPropsWithoutRef,
  ChangeEventHandler,
  useMemo,
  useEffect,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import { useFormatInputLabel } from "hooks";

import styles from "./TextArea.module.scss";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  name: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  label?: string | JSX.Element;
  fullWidth?: boolean;
  error?: boolean;
  errorText?: string;
  pattern?: string;
}

const withValueStyle = {
  top: "5px",
  fontSize: "12px",
};

const nullStyle = {
  top: "15px",
  fontSize: "20px",
};

export const TextArea = ({
  name,
  label,
  value,
  onChange,
  error = false,
  errorText,
  fullWidth = false,
  pattern,
  ...props
}: TextAreaProps) => {
  const [labelStyles, api] = useSpring(() =>
    value === "" ? nullStyle : withValueStyle
  );
  const formattedLabel = useFormatInputLabel({ label, name });
  const inputEl = useRef<HTMLTextAreaElement | null>(null);

  const containerStyles = [styles.container];
  const isValid = useMemo(() => {
    return pattern ? value !== "" && new RegExp(pattern).test(value) : true;
  }, [value, pattern]);

  if (error || !isValid) {
    containerStyles.push(styles.errorState);
    if (!isValid && !errorText) {
      errorText = `Invalid ${formattedLabel} format`;
    }
  }
  if (fullWidth) containerStyles.push(styles.fullWidth);

  function handleLabelClick() {
    inputEl.current?.focus();
  }

  function handleFocus() {
    api.start(withValueStyle);
  }

  function handleBlur() {
    value === "" && api.start(nullStyle);
  }

  useEffect(() => {
    value === "" ? api.start(nullStyle) : api.start(withValueStyle);
  }, [value, api]);

  return (
    <div className={containerStyles.join(" ")}>
      <animated.label
        htmlFor={name}
        style={labelStyles}
        onClick={handleLabelClick}
      >
        {formattedLabel}
        {props.required ? "*" : ""}
      </animated.label>
      <div className={styles.textContainer}>
        <textarea
          {...props}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputEl}
        />
        <p className={styles.textDisplay}>{value}</p>
      </div>
      <div className={styles.errorText}>{errorText}</div>
    </div>
  );
};
