import Header from "./components/Header";
import { ITemplate } from "./interface";

import styles from "./Template.module.scss";

const Template: React.FC<React.PropsWithChildren<ITemplate>> = ({
  children,
}) => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Template;
