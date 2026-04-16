import {
  ApartmentOutlined,
  AppstoreOutlined,
  AuditOutlined,
  BankOutlined,
  CarOutlined,
  CloudUploadOutlined,
  ContactsOutlined,
  CreditCardOutlined,
  DollarOutlined,
  DropboxOutlined,
  FundProjectionScreenOutlined,
  InteractionOutlined,
  PieChartOutlined,
  ShopOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { admin_routes } from "../../../util/path";
import LazyImage from "../../common/lazyLoad/LazyImage";

const { Sider } = Layout;

const siderLocalName = "siderCollapsed";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const checkOpen = (items) => {
  let result = items.find((item) => {
    if (item.key === window.location.pathname) return item;
    else if (item.children) {
      return item.children.find((i) => i.key === window.location.pathname);
    }
    return null;
  });
  return result?.key.toString();
};

const items = [
  getItem("Bosh sahifa", admin_routes.home, <PieChartOutlined size={200} />),
  {
    type: "divider",
  },
  getItem("Ta'minotchi qo'shish", admin_routes.supplierManagement, <ShoppingCartOutlined />),
  getItem("Mijoz qo'shish", admin_routes.customerManagement, <TeamOutlined />),
  getItem("Xolodilnikka o'tkazish", admin_routes.warehouseTransfer, <DropboxOutlined />),
  getItem("Olingan qarzlar", admin_routes.financeDebts, <BankOutlined />),
  getItem(
    "Ta'minotchiga berilgan pullar",
    admin_routes.supplierManagementPayments,
    <DollarOutlined />
  ),
  getItem(
    "Barcha ta'minotchilar hisoboti",
    admin_routes.supplierManagementAllReport,
    <AuditOutlined />
  ),
  getItem("Ta'minotchi hisoboti", admin_routes.supplierManagementReport, <AuditOutlined />),
  getItem("Hisobot massa", admin_routes.warehouseMassReport, <AuditOutlined />),
  getItem("Hisobot mijoz", admin_routes.customerManagementReport, <AuditOutlined />),
  getItem(
    "Mijozlardan kirim chiqim",
    admin_routes.customerManagementTransactions,
    <CreditCardOutlined />
  ),
  getItem("Xarajatlar", admin_routes.financeExpenses, <CreditCardOutlined />),
  getItem("Oylik", admin_routes.financeSalary, <UsergroupAddOutlined />),
  {
    type: "divider",
  },
  getItem("Ostatka", admin_routes.residue, <DropboxOutlined />),
  getItem("Maydalash hisoboti", admin_routes.reportGrind, <AuditOutlined />),
  getItem("Sozlamalar", "sub-settings", <SettingOutlined />, [
    getItem("Bo'lim qo'shish", admin_routes.department),
    getItem("Polka qo'shish", admin_routes.polka),
    getItem("Mahsulot qo'shish", admin_routes.product),
    getItem("Ishchi qo'shish", admin_routes.workers),
    getItem("Mijoz kategoriyasi", admin_routes.customerCategory),
    getItem("Foydalanuvchi qo'shish", admin_routes.user),
    getItem("Xarajat turi", admin_routes.expensesCategory),
  ]),
  getItem("Saqlash bo'limi", "sub2", <DropboxOutlined />, [
    getItem("Sklad", admin_routes.storageSkladDepart),
    getItem("Taminotchilar", admin_routes.storageProviderDepart),
    getItem("Maydalash bo'limidan", admin_routes.storageOrderFromGrindDepart),
    getItem("Xom ashyo zahirasi", admin_routes.storagePolkaDepart),
    getItem("Bajarilgan buyurtmalar", admin_routes.storageCompltedOrderDepart),
    getItem("Mahsulotlar", admin_routes.storageSpareDepart),
    getItem("Hisibotlar", admin_routes.storageReportDepart),
    getItem("Hamma mijozlarning hisoblari", admin_routes.storageReportCustomerDepart),
  ]),
  getItem("Maydalash bo'limi", "sub3", <InteractionOutlined />, [
    getItem("Sotuv bo'limidan", admin_routes.grindOrderFromSalesDepart),
    getItem("Saqlash bo'limidan", admin_routes.grindOrderFromStorageDepart),
    getItem("Maydalashdan chiqarilganlar", admin_routes.grindOutFromGrindDepart),
    getItem("Qayta maydalash", admin_routes.grindRegrindDepart),
    getItem("Qayta maydalanganlar tarixi", admin_routes.grindRegrindHistoryDepart),
    getItem("Zahira mahsulotlar", admin_routes.grindSpareProductsDepart),
  ]),
  getItem("Sotuv bo'limi", "sub4", <ShopOutlined />, [
    getItem("Maydalashga buyurtma jo'natish", admin_routes.salesGrindDepart),
    getItem("Yuklovchiga buyurtma jo'natish", admin_routes.salesOrderToUploaderDepart),
    getItem("Mijozlar", admin_routes.salesCustomerDepart),
    getItem("Buyurtmalar tarixi", admin_routes.salesOrderHistoryDepart),
    getItem("Qaytarilgan buyurtmalar", admin_routes.salesOrderReturnedDepart),
    getItem("Hisobotlar", admin_routes.salesReportDepart),
    getItem("Mijozlarning hisobotlari", admin_routes.salesReportCustomerDepart),
    getItem("Interval hisobot", admin_routes.salesReportAllDepart),
    getItem("Kunlik kirimlar", admin_routes.salesDailyReceiptsDepart),
    getItem("Yechilgan qarzlar tarixi", admin_routes.salesResolvedDebtHistory),
  ]),
  getItem("Yuklovchi bo'limi", "sub5", <CloudUploadOutlined />, [
    getItem("Bosh sahifasi", admin_routes.uploaderDepart),
    getItem("Maydalashdan tushgan buyurtmalar", admin_routes.uploaderOrderFromGrindProcessDepart),
    getItem("Qayta maydalashdan tushgan buyurtmalar", admin_routes.uploaderRegrindProcessDepart),
    getItem("Sotuvdan tushgan buyurtmalar", admin_routes.uploaderOrderFromSalesProcessDepart),
    getItem("Almashtirish", admin_routes.uploaderReplaceDepart),
    getItem("Qayta maydalashdan", admin_routes.uploaderRegrindDepart),
    getItem("Zahira partiya", admin_routes.uploaderSparePartiyaDepart),
    getItem("Qaytarilgan mahsulotlar", admin_routes.uploaderReturnedProductsDepart),
    getItem("Mahsulotlar", admin_routes.uploaderProductsDepart),
    getItem("Maydalashga buyurtma berish", admin_routes.uploaderOrderToGrindDepart),
    getItem("Buyurtmalar tarixi", admin_routes.uploaderOrderHistoryDepart),
    getItem("Hisobotlar", admin_routes.uploaderReportDepart),
    getItem("Pateriya hisoboti", admin_routes.uploaderReportPateriyaDepart),
    getItem("Krim yuk hisoboti", admin_routes.uploaderReportReceptionDepart),
    getItem("Chiqim hisobotlari", admin_routes.uploaderReportOutputDepart),
  ]),
  getItem("Agent bo'limi", "sub6", <ContactsOutlined />, [
    getItem("Bosh sahifa", admin_routes.agentDepart),
  ]),
  getItem("Yetkazib berish bo'limi", "sub7", <CarOutlined />, [
    getItem("Bosh sahifasi", admin_routes.supplierDepart),
    getItem("Qarz", admin_routes.supplierDebtDepart),
    getItem("Balans", admin_routes.supplierBalansDepart),
    getItem("Almashtirish", admin_routes.supplierChangeOrderDepart),
    getItem("Mahsulotni qaytarish", admin_routes.supplierReturnProductDepart),
    getItem("Hisobotlar", admin_routes.supplierReportDepart),
    getItem("Hamma mijozlarning hisobotlari", admin_routes.supplierReportCustomerDepart),
    getItem("Topshirilgan buyurtmalar", admin_routes.supplierSubmittedOrdersDepart),
  ]),
  getItem("Kassir bo'limi", "sub8", <DollarOutlined />, [
    getItem("Bosh sahifa", admin_routes.cashierDepart),
    getItem("Taminotchiga berilgan pullar", admin_routes.cashierProviderMoneyGiven),
    getItem("Taminotchi hisoboti", admin_routes.cashierProviderReport),
    getItem("Dostavkachi balansi", admin_routes.cashierSupplierBalans),
    getItem("Dostavkachidan olingan pullar", admin_routes.cashierSupplierGetMoney),
    getItem("Mijozlardan olingan pullar", admin_routes.cashierCustomerGetMoney),
    getItem("Xarajatlar", admin_routes.cashierExpenses),
    getItem("Oylik", admin_routes.cashierSalary),
    getItem("Tayyor mahsulotlar bo'limi", admin_routes.cashierCompletedProductSection),
    getItem("Ayirboshlanganlar tarixi", admin_routes.cashierExchangeHistory),
  ]),
];

const AdminSider = ({ collapsed, setCollapsed }) => {
  /* Menu open items */
  let checkOpenItemValue = checkOpen(items);

  /* State */
  const [active, setActive] = useState({
    sub: checkOpenItemValue,
    item: window.location.pathname,
  });

  /* Navigate */
  const navigate = useNavigate();

  /* Location */
  const { pathname } = useLocation();

  /* Config */
  useEffect(() => {
    const res = localStorage.getItem(siderLocalName);
    setCollapsed(res === "active");
  }, [setCollapsed]);

  /* Collapse sider */
  const onCollapse = (val) => {
    setCollapsed(val);
    const newCollapse = collapsed;
    let status = "active";
    if (newCollapse) status = "notActive";

    localStorage.setItem(siderLocalName, status);
  };

  useEffect(() => {
    setActive({
      sub: checkOpen(items),
      item: window.location.pathname,
    });
  }, [pathname]);

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      defaultCollapsed={true}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
      }}
      width={280}
    >
      <Link to={admin_routes.home}>
        {collapsed ? (
          <LazyImage imgUrl={"/images/logo-light-min.png"} width={70} />
        ) : (
          <LazyImage imgUrl={"/images/logo-light.png"} width={120} />
        )}
      </Link>
      <Menu
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
        theme="dark"
        selectedKeys={[active.item]}
        defaultOpenKeys={[active.sub]}
        defaultSelectedKeys={[active.item]}
        mode="inline"
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AdminSider;
