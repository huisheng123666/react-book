import React, { ReactNode } from "react";
import "./index.scss";
import ErrorImage from "./errorImage";

export interface ErrorBlockProps {
  title?: ReactNode;
  description?: ReactNode;
  image?: ReactNode;
}

const classPrefix = "ygm-error-block";

const ErrorBlock: React.FC<ErrorBlockProps> = ({
  title = "页面遇到一些小问题",
  description = "请稍候重试",
  image,
}) => {
  let imageNode: ReactNode = ErrorImage;

  if (image) {
    imageNode = image;
  }

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-image`}>{imageNode}</div>
      <div className={`${classPrefix}-description`}>
        <div className={`${classPrefix}-description-title`}>{title}</div>
        <div className={`${classPrefix}-description-subtitle`}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
