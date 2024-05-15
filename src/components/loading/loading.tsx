import { SpinnerLoading } from "@/bases";
import styles from "./index.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <SpinnerLoading size={42} />
    </div>
  );
};

export default Loading;
