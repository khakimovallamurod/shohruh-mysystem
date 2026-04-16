import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import MainSegmented from "../../components/ui/segmented/MainSegmented";
import { CrmRoutes } from "../../util/path";

function CrmLayout() {
  /* TABS */
  const headerTabs = [
    {
      value: CrmRoutes.home,
      label: "Mijozlarning fikrini bilish",
    },
    {
      value: CrmRoutes.orderHistory,
      label: "Buyurtmalar tarixi",
    },
    {
      value: CrmRoutes.customerData,
      label: "Mijoz ma'lumotlari",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <MainHeader menu={<MainMenu />} />

      {/* Tab panel */}
      <div>
        <MainSegmented options={headerTabs} />
      </div>

      {/* Content */}
      <Content
        style={{
          padding: "0 24px",
          minHeight: 280,
          overflow: "auto",
        }}
      >
        {/* Outlet */}
        <MainOutlet />
      </Content>
    </Layout>
  );
}

export default CrmLayout;
