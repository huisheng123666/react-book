import cx from "classnames";
import React from "react";

export interface CardProps {
  title?: string;
  extra?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  extraClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  onHeaderClick: (e)
}
