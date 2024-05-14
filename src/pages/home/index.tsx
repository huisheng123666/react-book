import { useEffect } from "react";
import Header from "./components/header";
import styles from "./index.module.scss";
import useRequest from "@/hooks/useRequest/useRequest";

const Home: React.FC = () => {
  const { data, error } = useRequest({
    url: "/api/v1/home",
  });

  console.log(data);

  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
};

export default Home;
