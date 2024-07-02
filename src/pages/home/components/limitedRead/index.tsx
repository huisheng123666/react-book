import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Card, Grid, Space } from "@/bases";
import { px2rem } from "@/utils/unit";
import { Countdown } from "@/bases";
import BookCover from "@/components/bookCover";
import { IBookInfo } from "@/types/book";

interface LimitedReadProps {
  books: IBookInfo[];
}

const time = 1000 * 60 * 60 * 30;

const LimitedRead: FC<LimitedReadProps> = ({ books }) => {
  const navigate = useNavigate();

  const Header = useMemo(() => {
    return (
      <div className={styles.headerLeft}>
        <div className={styles.title}>限时免费</div>
        <div className={styles.divider}>|</div>
        <Countdown
          time={time}
          format="hh:mm:ss"
          numberClassName={styles.num}
          symbolClassName={styles.symbol}
        />
      </div>
    );
  }, []);

  return (
    <div className={styles.limited}>
      <Card title={Header} headerClassName={styles.header}>
        <Grid columns={4} gap={px2rem(16)}>
          {books.map((book) => (
            <Grid.Item
              key={book.bookId}
              onClick={() => navigate(`/book/${book.bookId}`)}
            >
              <BookCover src={book.coverImg} alt={book.title} />
              <Space direction="vertical" gap={px2rem(6)}>
                <div className={styles.bookName}>{book.title}</div>
                <div className={styles.author}>{book.author}</div>
              </Space>
            </Grid.Item>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default LimitedRead;
