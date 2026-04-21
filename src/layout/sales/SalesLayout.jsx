import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import SalesSider from "../../components/sales/sider/SalesSider";
import styles from "./salesLayout.module.css";

function SalesLayout() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <SalesSider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <MainHeader
          menu={<Button onClick={() => dispatch(logOut())}>Chiqish</Button>}
          menuFor="admin"
        />

        <Content
          className={`${styles.layout} ${!collapsed ? styles.active : ""}`}
          style={{
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <MainOutlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SalesLayout;
