import React, { ComponentPropsWithoutRef, ReactElement } from "react";

import styles from "./Table.module.scss";

type TableKey = {
  key: string;
  hasSearch: boolean;
};

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  keys: (string | TableKey)[];
  data: Record<string, unknown>[];
  className?: string;
  formatFunctions?: Record<string, (val: any) => string | ReactElement>;
  actions?: React.ReactNode[] | React.ReactNode;
  keyLabelMapping?: { [key: string]: string }
}

export const Table = ({
  keys,
  data,
  className,
  formatFunctions,
  actions = [],
  keyLabelMapping,
  ...props
}: TableProps) => {
  const containerStyles = [styles.container];

  if (className) {
    containerStyles.push(className);
  }

  function getKey(key: string | TableKey): string {
    return typeof key === "object" ? key.key : key;
  }

  return (
    <>
      <div>{actions}</div>
      <table {...props} className={containerStyles.join(" ")}>
        <thead>
          <tr>
            {
              keys.map((key) => {
                if (keyLabelMapping) {
                  return <th key={getKey(key)}>{keyLabelMapping[getKey(key)]}</th>
                } else {
                  return <th key={getKey(key)}>{getKey(key)}</th>
                }
              })
            }
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            return (
              <tr key={idx}>
                {keys.map((key) => {
                  const foundKey = getKey(key);
                  const val = row[foundKey];

                  if (formatFunctions && formatFunctions[foundKey]) {
                    return (
                      <td key={foundKey}>{formatFunctions[foundKey](val)}</td>
                    );
                  }

                  switch (typeof val) {
                    case "string":
                      return <td key={foundKey}>{val}</td>;
                    case "object":
                      if (React.isValidElement(val)) {
                        return <td key={foundKey}>{val}</td>;
                      }
                    case "boolean":
                      if (typeof val === "boolean") {
                        return <td key={foundKey}>{val.toString()}</td>;
                      }
                    default:
                      return <td key={foundKey} />;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
