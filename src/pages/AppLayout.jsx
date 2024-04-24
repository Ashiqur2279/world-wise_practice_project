import React from "react";
import Map from "../component/Map";
import Sidebar from "../component/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../component/User";
const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
