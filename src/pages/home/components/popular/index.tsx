import styles from "./index.module.scss";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { px2rem } from "@/utils/unit";
import { IBookInfo } from "@/types/book";
import { Space, Card, Grid } from "@/bases";
import BookCover from "@/components/bookCover";

interface PopularProps {
  books?: IBookInfo[];
}

const Popular: React.FC<PopularProps> = ({ books = [] }) => {
  const navigate = useNavigate();

  const onHeaderClick = useCallback(() => {
    navigate("/book-list/popular");
  }, [navigate]);

  const renderContent = () => {
    return books.map((book) => {
      return (
        <Grid.Item
          key={book.bookId}
          onClick={() => navigate(`/book/${book.bookId}`)}
        >
          <Space gap={px2rem(12)}>
            <BookCover src={book.coverImg} alt={book.title} />
            <Space direction="vertical" justify="between" gap={px2rem(12)}>
              <div className={styles.bookName}>{book.title}</div>
              <div className={styles.desc}>{book.desc}</div>
              <div className={styles.meta}>
                {book.author}·{book.categoryName}
              </div>
            </Space>
          </Space>
        </Grid.Item>
      );
    });
  };

  return (
    <div className={styles.popular}>
      <Card
        title="热门精选"
        extra="更多"
        onHeaderClick={onHeaderClick}
        headerClassName={styles.header}
      >
        <Grid columns={1} gap={px2rem(24)}>
          {renderContent()}
        </Grid>
      </Card>
    </div>
  );
};

export default Popular;
