import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import AdminSider from "../../components/admin/sider/AdminSider";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import styles from "./adminLayout.module.css";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const classess = [styles.layout];

  if (!collapsed) classess.push(styles.active);

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sider */}
      <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Layout */}
      <Layout className={classess.join(" ")}>
        {/* Header */}
        <MainHeader menuFor="admin" menu={<MainMenu />} />

        {/* Content */}
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          {/* Outlet */}
          <MainOutlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
