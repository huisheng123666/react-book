import React, { useMemo } from "react";
import "./styles/index.scss";
import cx from "classnames";

export interface SpaceProps {
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  justify?:
    | "start"
    | "end"
    | "center"
    | "around"
    | "between"
    | "evenly"
    | "stretch";
  wrap?: boolean;
  block?: boolean;
  gap?: number | string | [number | string, number | string];
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

const classPrefix = "ygm-space";

function formatGap(gap: string | number) {
  if (typeof gap === "number") {
    return `${gap}px`;
  }
  return gap;
}

const Space: React.FC<SpaceProps> = ({
  direction = "horizontal",
  children,
  wrap,
  block,
  align,
  justify,
  onClick,
  gap,
}) => {
  const style = useMemo(() => {
    if (gap) {
      let gaps: [number | string, number | string] = [0, 0];
      if (Array.isArray(gap)) {
        gaps = gap as [number, number];
      } else {
        gaps[0] = gap;
        gaps[1] = gap;
      }
      return {
        "--gap-horizontal": formatGap(gaps[0]),
        "--gap-vertical": formatGap(gaps[1]),
      } as React.CSSProperties;
    }
    return {};
  }, [gap]);

  return (
    <div
      className={cx(classPrefix, {
        [`${classPrefix}-wrap`]: wrap,
        [`${classPrefix}-block`]: block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${align}`]: !!align,
        [`${classPrefix}-justify-${justify}`]: !!justify,
      })}
      onClick={(event) => onClick && onClick(event)}
      style={style}
    >
      {React.Children.map(children, (child) => {
        return child && <div className={`${classPrefix}-item`}>{child}</div>;
      })}
    </div>
  );
};

Space.displayName = "Space";

export default Space;
