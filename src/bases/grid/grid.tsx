import { CSSProperties, useMemo } from "react";

export interface GridProps {
  columns: number;
  gap?: number | string | [number | string, number | string];
  children: React.ReactNode;
}

const formatGap = (gap: string | number) =>
  typeof gap === "number" ? `${gap}px` : gap;

const classPrefix = "ygm-grid";

const Grid: React.FC<GridProps> = ({ children, gap, columns }) => {
  const style = useMemo(() => {
    if (gap !== undefined) {
      if (Array.isArray(gap)) {
        const [gapH, gapV] = gap;
        return {
          "--gap-horizontal": formatGap(gapH),
          "--gap-vertical": formatGap(gapV),
          "--columns": columns,
        };
      }
      return {
        "--gap": formatGap(gap),
        "--columns": columns,
      };
    }
    return {
      "--columns": columns,
    };
  }, [gap, columns]);

  return (
    <div className={classPrefix} style={style as CSSProperties}>
      {children}
    </div>
  );
};

export default Grid;
