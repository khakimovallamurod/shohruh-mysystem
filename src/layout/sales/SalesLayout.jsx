import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SalesSider from "../../components/sales/sider/SalesSider";
import SwitchDepartBtn from "../../components/common/switchDepartBtn/SwitchDepartBtn";
import SalesNotification from "../../components/sales/notification/SalesNotification";
import {
  CASHIER_HOME_ROUTE,
} from "../../util/path";
import styles from "./salesLayout.module.css";

function SalesLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const classess = [styles.layout];

  if (!collapsed) classess.push(styles.active);

  return (
    <Layout style={{ height: "100vh" }}>
      <SalesSider collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout className={classess.join(" ")}>
        <MainHeader
          menu={
            <MainMenu
              otherItems={
                <>
                  <SwitchDepartBtn
                    title={"Kassirga o'tish"}
                    to={CASHIER_HOME_ROUTE}
                  />
                  <SalesNotification />
                </>
              }
            />
          }
          menuFor="admin"
        />

        <Content
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
