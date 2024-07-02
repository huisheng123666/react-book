import { useMemo, CSSProperties } from "react";
import "./styles/grid-item.scss";

export interface GridItemProps {
  /** 跨度 在网格中占几列 */
  span?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const classPrefix = "ygm-grid-item";

const GridItem: React.FC<GridItemProps> = ({ children, span, onClick }) => {
  const style = useMemo(() => {
    return {
      "--item-span": span,
    };
  }, []);

  return (
    <div
      className={classPrefix}
      onClick={onClick}
      style={style as CSSProperties}
    >
      {children}
    </div>
  );
};

export default GridItem;
