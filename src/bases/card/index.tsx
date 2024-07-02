import cx from "classnames";
import React from "react";
import "./styles/index.scss";

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  extraClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  onHeaderClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onBodyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const classPrefix = "ygm-card";

const Card: React.FC<CardProps> = ({
  title,
  extra,
  headerClassName,
  titleClassName,
  extraClassName,
  children,
  bodyClassName,
  onHeaderClick,
  onBodyClick,
}) => {
  const renderHeader = () => {
    if (!title && !extra) return null;
    return (
      <div
        className={cx(classPrefix + "-header", headerClassName)}
        onClick={onHeaderClick}
      >
        <div className={cx(classPrefix + "-title", titleClassName)}>
          {title}
        </div>
        <div className={cx(classPrefix + "-extra", extraClassName)}>
          {extra}
        </div>
      </div>
    );
  };

  const renderBody = () => {
    if (!children) return null;
    return (
      <div
        className={cx(classPrefix + "-body", bodyClassName)}
        style={{ paddingTop: title || extra ? 0 : "12px" }}
        onClick={onBodyClick}
      >
        {children}
      </div>
    );
  };

  return (
    <div className={classPrefix}>
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

export default Card;
