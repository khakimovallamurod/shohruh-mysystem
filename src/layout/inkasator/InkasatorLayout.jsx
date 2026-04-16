import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import MainSegmented from "../../components/ui/segmented/MainSegmented";
import { InkasatorRoutes } from "../../util/path";
import Section from "../../components/common/section/Section";

function InkasatorLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <MainHeader menu={<MainMenu />} />

      {/* Content */}
      <Content
        style={{
          padding: "0 12px",
          minHeight: 280,
          overflow: "auto",
        }}
      >
        <Section style={{ maxWidth: "1200px", margin: "auto" }}>
          {/* Outlet */}
          <MainOutlet />
        </Section>
      </Content>
    </Layout>
  );
}

export default InkasatorLayout;
