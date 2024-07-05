import React from "react";
import styles from "./index.module.scss";
import { Image } from "@/bases";

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties &
    Partial<Record<"--width" | "--height" | "--radio", string>>;
}

const BookCover: React.FC<BookCoverProps> = ({ src, alt, style }) => {
  return (
    <div className={styles.bookCover} style={style}>
      <Image lazy src={src} alt={alt} className={styles.coverImg} />
    </div>
  );
};

export default BookCover;
