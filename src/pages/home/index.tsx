import Header from "./components/header";
import styles from "./index.module.scss";
import useRequest from "@/hooks/useRequest/useRequest";
import Loading from "@/components/loading/loading";
import { ErrorBlock } from "@/bases";
import { Swiper } from "@taoyage/react-mobile-ui";
import { IHomeData } from "./types";
import Navbar from "./components/navbar";

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
      <Swiper autoplay loop style={{ "--border-radius": "12px" }}>
        {data.banner.map((item) => (
          <Swiper.Item key={item.src}>
            <img src={item.src} alt={item.alt} height="100%" width="100%" />
          </Swiper.Item>
        ))}
      </Swiper>
      <Navbar />
    </div>
  );
};

export default Home;
