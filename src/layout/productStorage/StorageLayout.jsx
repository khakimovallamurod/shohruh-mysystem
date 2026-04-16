import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SwitchDepartBtn from "../../components/common/switchDepartBtn/SwitchDepartBtn";
import StorageNotification from "../../components/productStorage/notification/StorageNotification";
import ReceptionModal from "../../components/sklad/receptiomModal/ReceptionModal";
import MainSegmented from "../../components/ui/segmented/MainSegmented";
import {
  GRIND_PRODUCT_HOME_ROUTE,
  PRODUCT_STORAGE_COMPLETED_ORDER_ROUTE,
  PRODUCT_STORAGE_POLKA_ROUTE,
  PRODUCT_STORAGE_PROVIDER_ROUTE,
  PRODUCT_STORAGE_REPORT_ALL_ROUTE,
  PRODUCT_STORAGE_REPORT_ROUTE,
  PRODUCT_STORAGE_RESIDUE,
  PRODUCT_STORAGE_SKLAD_ROUTE,
  PRODUCT_STORAGE_SPARE_ROUTE,
  UPLOADER_HOME_ROUTE,
} from "../../util/path";

const headerTabs = [
  // {
  //   value: PRODUCT_STORAGE_HOME_ROUTE,
  //   label: "Asosiy",
  // },
  {
    value: PRODUCT_STORAGE_SKLAD_ROUTE,
    label: "Sklad",
  },
  {
    value: PRODUCT_STORAGE_PROVIDER_ROUTE,
    label: "Taminotchilar",
  },
  // {
  //   value: PRODUCT_STORAGE_ORDER_GRIND_ROUTE,
  //   label: "Maydalash bo'limidan",
  // },
  // {
  //   value: PRODUCT_STORAGE_ORDER_RECEPTION_ROUTE,
  //   label: "Qabul qilish bo'limidan",
  // },
  {
    value: PRODUCT_STORAGE_POLKA_ROUTE,
    label: "Xom ashyo zahirasi ",
  },
  {
    value: PRODUCT_STORAGE_COMPLETED_ORDER_ROUTE,
    label: "Bajararilgan buyurtmalar",
  },
  {
    value: PRODUCT_STORAGE_SPARE_ROUTE,
    label: "Mahsulotlar",
  },
  {
    value: PRODUCT_STORAGE_REPORT_ROUTE,
    label: "Hisobotlar",
  },
  {
    value: PRODUCT_STORAGE_REPORT_ALL_ROUTE,
    label: "Hamma mijozlarning hisoblari",
  },
  {
    value: PRODUCT_STORAGE_RESIDUE,
    label: "Ostatka",
  },
];

function StorageLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <MainHeader
        menu={
          <MainMenu
            otherItems={
              <>
                <SwitchDepartBtn
                  to={GRIND_PRODUCT_HOME_ROUTE}
                  title="Maydalashga o'tish"
                />
                <SwitchDepartBtn
                  to={UPLOADER_HOME_ROUTE}
                  title="Yuklovchiga o'tish"
                />
                {/* <StorageProdCombine /> */}
                <StorageNotification />
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

        {/* Reception modal */}
        <ReceptionModal />
      </Content>
    </Layout>
  );
}

export default StorageLayout;
