import { Outlet } from "react-router-dom";
import { SideNav } from "@common";
import styles from "./PageLayout.module.css";
import { AppContextProvider } from "@root/AppContext";
export function PageLayout() {
  return (
    <AppContextProvider>
      <div className={styles.layout}>
        <SideNav />
        <div className={styles["content-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}
