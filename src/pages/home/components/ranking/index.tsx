import { FC } from "react";
import styles from "./index.module.scss";
import { Card, Grid, Space } from "@/bases";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@/bases";
import { IRanking } from "../../types";
import BookCover from "@/components/bookCover";
import { px2rem } from "@/utils/unit";

const Ranking: FC<{ ranking: IRanking[] }> = ({ ranking }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.ranking}>
      <Card
        title="排行榜"
        extra="更多"
        headerClassName={styles.header}
        onHeaderClick={() => navigate("/ranking")}
      >
        <Tabs
          activeKey={ranking[0]?.id}
          showTabLine={false}
          type="card"
          tabListClassName={styles.tabList}
          tabActiveClassName={styles.tabActive}
        >
          {ranking.map((item) => {
            return (
              <Tabs.Tab key={item.id} title={item.title} name={item.id}>
                <Grid columns={2} gap={px2rem(16)}>
                  {item.books.map((book) => {
                    return (
                      <Grid.Item
                        key={book.bookId}
                        onClick={() => navigate(`/book/${book.bookId}`)}
                      >
                        <Space>
                          <BookCover
                            src={book.coverImg}
                            alt={book.title}
                            style={{
                              "--width": px2rem(47),
                              "--height": px2rem(66),
                            }}
                          />
                          <div className={styles.bookInfo}>
                            <div className={styles.bookName}>{book.title}</div>
                            <div className={styles.author}>{book.author}</div>
                          </div>
                        </Space>
                      </Grid.Item>
                    );
                  })}
                </Grid>
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </Card>
    </div>
  );
};

Ranking.displayName = "Ranking";

export default Ranking;
