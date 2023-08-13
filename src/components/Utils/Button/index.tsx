"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./index.module.scss";

import { Button as XButton, CircularProgress } from "@mui/material";

// import { Spinner } from '@/components/DataDisplay'

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: string;
  variant?: "default" | "outlined";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

const sizeMap: {
  sm: "small";
  md: "medium";
  lg: "large";
  xl: "large";
} = {
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "large",
};

const variantMap: {
  default: "contained";
  outlined: "outlined";
} = {
  default: "contained",
  outlined: "outlined",
};

const paddingSize = 10;

export const Button = ({
  children,
  variant = "default",
  size = "md",
  isLoading = false,
  ...props
}: ButtonProps) => {
  const buttonStyles = [styles.base, styles[variant], styles[size]];
  let isDisabled = props.disabled;

  if (isDisabled) {
    buttonStyles.push(styles.disabled);
  }

  if (isLoading) {
    isDisabled = true;
    buttonStyles.push(styles.isLoading);
    buttonStyles.push(styles.disabled);
  }

  return (
    <XButton
      variant={variantMap[variant]}
      size={sizeMap[size]}
      disabled={isDisabled}
      onClick={props.onClick}
      startIcon={
        isLoading ? (
          <CircularProgress size={paddingSize} color="inherit" />
        ) : (
          <span style={{ width: paddingSize }} />
        )
      }
      endIcon={<span style={{ width: paddingSize }} />}
    >
      <>{children.toUpperCase()}</>
    </XButton>
  );
};
