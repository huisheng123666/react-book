import Header from "./components/header";
import styles from "./index.module.scss";
import useRequest from "@/hooks/useRequest/useRequest";
import Loading from "@/components/loading/loading";
import { ErrorBlock, Image } from "@/bases";
import { Swiper } from "@taoyage/react-mobile-ui";
import { IHomeData } from "./types";
import Navbar from "./components/navbar";
import { px2rem } from "@/utils/unit";
import { Space } from "@/bases";
import Popular from "./components/popular";
import Recommend from "./components/recommend";
import LimitedRead from "./components/limitedRead";
import Ranking from "./components/ranking";

const Home: React.FC = () => {
  const { data, error } = useRequest<IHomeData>({
    url: "/api/v1/home",
  });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <Space direction="vertical" gap={px2rem(12)}>
        <Swiper autoplay loop style={{ "--border-radius": "12px" }}>
          {data.banner.map((item) => (
            <Swiper.Item key={item.src}>
              <Image src={item.src} alt={item.alt} />
            </Swiper.Item>
          ))}
        </Swiper>
        <Navbar />
        <Popular books={data.popular} />
        <Recommend books={data.recommend} />
        <LimitedRead books={data.limited} />
        <Ranking ranking={data.ranking} />
      </Space>
    </div>
  );
};

export default Home;
