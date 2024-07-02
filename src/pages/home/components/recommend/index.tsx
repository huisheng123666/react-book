import { memo } from "react";
import styles from "./index.module.scss";
import { Card, Grid, Space } from "@/bases";
import { useNavigate } from "react-router-dom";
import { px2rem } from "@/utils/unit";
import { IBookInfo } from "@/types/book";
import BookCover from "@/components/bookCover";

interface RecommendProps {
  books: IBookInfo[];
}

const Recommend: React.FC<RecommendProps> = memo(({ books }) => {
  const navigate = useNavigate();

  const onHeaderClick = () => {
    navigate("/book-list/recommend");
  };

  return (
    <div className={styles.recommend}>
      <Card
        title="今日推荐"
        extra="更多"
        titleClassName={styles.title}
        headerClassName={styles.header}
        onHeaderClick={onHeaderClick}
      >
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
});

export default Recommend;
