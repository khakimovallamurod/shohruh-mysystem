import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import CashierSider from "../../components/cashier/sider/CashierSider";
import CurrencyExchange from "../../components/common/exchange/CurrencyExchange";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import styles from "./cashierLayout.module.css";
import SwitchDepartBtn from "../../components/common/switchDepartBtn/SwitchDepartBtn";
import { SALES_HOME_ROUTE } from "../../util/path";

function CashierLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const classess = [styles.layout];

  if (!collapsed) classess.push(styles.active);
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sider */}
      <CashierSider collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Layout */}
      <Layout className={classess.join(" ")}>
        {/* Header */}
        <MainHeader
          menu={
            <MainMenu
              otherItems={
                <>
                  <SwitchDepartBtn
                    title={"Sotuvga o'tish"}
                    to={SALES_HOME_ROUTE}
                  />
                  <CurrencyExchange />
                </>
              }
            />
          }
        />

        {/* Content */}
        <Content
          style={{
            padding: "0 16px",
            paddingTop: 16,
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

export default CashierLayout;
