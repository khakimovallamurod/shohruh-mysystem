import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SwitchDepartBtn from "../../components/common/switchDepartBtn/SwitchDepartBtn";
import GrindGetProductModal from "../../components/grind/getProduct/GrindGetProductModal";
import MainSegmented from "../../components/ui/segmented/MainSegmented";
import {
  GRIND_PRODUCT_ORDER_SALES_ROUTE,
  GRIND_PRODUCT_ORDER_STORAGE_ROUTE,
  GRIND_PRODUCT_OUT_PRODUCT_FROM_GRIND_ROUTE,
  GRIND_RESIDUE,
  GRIND_SPARE_PRODUCT_ROUTE,
  PRODUCT_STORAGE_HOME_ROUTE,
} from "../../util/path";
const headerTabs = [
  {
    value: GRIND_PRODUCT_ORDER_SALES_ROUTE,
    label: "Sotuv bo'limidan",
  },
  {
    value: GRIND_PRODUCT_ORDER_STORAGE_ROUTE,
    label: "Maydalash",
  },
  {
    value: GRIND_PRODUCT_OUT_PRODUCT_FROM_GRIND_ROUTE,
    label: "Maydalashdan chiqarilganlar",
  },
  // {
  //   value: GRIND_REGRIND_ROUTE,
  //   label: "Qayta maydalash",
  // },
  // {
  //   value: GRIND_REGRIND_HISTORY_ROUTE,
  //   label: "Qayta maydalanganlar tarixi",
  // },
  // {
  //   value: GRIND_SPARE_ROUTE,
  //   label: "Zahira",
  // },
  {
    value: GRIND_SPARE_PRODUCT_ROUTE,
    label: "Zahira mahsulotlar",
  },
  // {
  //   value: GRIND_REPORT_PATERIYA_ROUTE,
  //   label: "Pateriya hisoboti",
  // },
  {
    value: GRIND_RESIDUE,
    label: "Ostatka",
  },
];

function GrindProductLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <MainHeader
        menu={
          <MainMenu
            otherItems={
              <>
                <SwitchDepartBtn
                  to={PRODUCT_STORAGE_HOME_ROUTE}
                  title="Yukni qabul qilishga o'tish"
                />
                {/* <GrindProdCombine /> */}
                {/* <CreateRegrind /> */}
                {/* <GrindNotification /> */}
              </>
            }
          />
        }
      />

      {/* Tab panel */}
      <MainSegmented options={headerTabs} />

      {/* Content */}
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          overflow: "auto",
          height: "100%",
        }}
      >
        {/* Outlet */}
        <MainOutlet />

        <GrindGetProductModal />
      </Content>
    </Layout>
  );
}

export default GrindProductLayout;
