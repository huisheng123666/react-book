import "./styles/index.scss";
import cx from "classnames";

export interface SpinnerLoadingProps {
  color?: "default" | "primary" | "white";
  size?: number;
  style?: React.CSSProperties;
}

const classPrefix = "ygm-spinner-loading";

const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({
  color = "default",
  size = 32,
  style,
}) => {
  return (
    <div
      className={cx(classPrefix, `${classPrefix}-color-${color}`)}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    ></div>
  );
};

export default SpinnerLoading;

SpinnerLoading.displayName = "SpinnerLoading";
