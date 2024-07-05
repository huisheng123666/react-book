import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

export interface ImageProps {
  /** 图片地址 */
  src: string;
  /** 图片描述 */
  alt?: string;
  /** 图片宽度 */
  width?: string | number;
  /** 图片高度 */
  height?: string | number;
  className?: string;
  /** 图片加载时显示的图片 */
  loading?: string;
  style?: React.CSSProperties;
  /** 图片是否懒加载 */
  lazy?: boolean;
  /** 图片填充模式 */
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLImageElement, Event>) => void;
  /* 图片加载失败事件 */
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /* 图片加载成功事件 */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  width = "100%",
  height = "100%",
  className,
  loading = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII=",
  style,
  lazy = false,
  fit = "fill",
  onClick,
  onError,
  onLoad,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const entry = useIntersectionObserver(imageRef, {
    freezeOnceVisible: true,
  });

  return (
    <img
      ref={imageRef}
      src={entry?.isIntersecting || !lazy ? src : loading}
      alt={alt}
      className={className}
      style={{ ...style, objectFit: fit }}
      width={width}
      height={height}
      onClick={onClick}
      onError={onError}
      onLoad={onLoad}
      draggable={false}
    />
  );
};

export default Image;
