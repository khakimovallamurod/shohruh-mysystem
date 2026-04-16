import {
  DollarOutlined,
  ContactsOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  FundOutlined,
  InboxOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  ScissorOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  WalletOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sales_routes } from "../../../util/path";
import LazyImage from "../../common/lazyLoad/LazyImage";

const { Sider } = Layout;

const siderLocalName = "salesSiderCollapsed";

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Dashboard", sales_routes.dashboard, <FundOutlined />),
  getItem("Sotuv", sales_routes.home, <PieChartOutlined />),
  getItem("Kassa", sales_routes.kassa, <BankOutlined />),
  getItem("Razilka", sales_routes.razilka, <ScissorOutlined />),
  { type: "divider" },
  getItem("Ta'minotchi qo'shish", sales_routes.supplierManagement, <ShoppingCartOutlined />),
  getItem("Mijoz qo'shish", sales_routes.customerManagement, <TeamOutlined />),
  getItem("Xolodilnikka o'tkazish", sales_routes.warehouseTransfer, <ShoppingCartOutlined />),
  getItem("Olingan qarzlar", sales_routes.financeDebts, <MoneyCollectOutlined />),
  getItem("Ta'minotchiga berilgan pullar", sales_routes.supplierManagementPayments, <DollarOutlined />),
  getItem("Barcha ta'minotchilar hisoboti", sales_routes.supplierManagementAllReport, <FundOutlined />),
  getItem("Ta'minotchi hisoboti", sales_routes.supplierManagementReport, <FileTextOutlined />),
  getItem("Hisobot massa", sales_routes.warehouseMassReport, <InboxOutlined />),
  getItem("Hisobot mijoz", sales_routes.customerManagementReport, <ContactsOutlined />),
  getItem("Mijozlardan kirim chiqim", sales_routes.customerManagementTransactions, <WalletOutlined />),
  getItem("Xarajatlar", sales_routes.financeExpenses, <ExperimentOutlined />),
  getItem("Oylik", sales_routes.financeSalary, <DollarOutlined />),
  { type: "divider" },
  getItem("Sozlamalar", "sub-settings", <SettingOutlined />, [
    getItem("Bo'lim qo'shish", sales_routes.settingsDepartment),
    getItem("Polka qo'shish", sales_routes.settingsPolka),
    getItem("Mahsulot qo'shish", sales_routes.settingsProduct),
    getItem("Ishchi qo'shish", sales_routes.settingsWorkers),
    getItem("Mijoz kategoriyasi", sales_routes.settingsCustomerCategory),
    getItem("Xarajat turi", sales_routes.settingsExpensesCategory),
  ]),
];

const checkOpen = (menuItems) => {
  const result = menuItems.find((item) => {
    if (item.key === window.location.pathname) return item.key;
    if (item.children) {
      const child = item.children.find(
        (menuChild) => menuChild.key === window.location.pathname
      );
      if (child) return item.key;
    }
    return null;
  });
  return result?.toString();
};

function SalesSider({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState({
    sub: checkOpen(items),
    item: window.location.pathname,
  });

  useEffect(() => {
    const res = localStorage.getItem(siderLocalName);
    setCollapsed(res === "active");
  }, [setCollapsed]);

  useEffect(() => {
    if (pathname === sales_routes.home) {
      navigate(sales_routes.dashboard, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActive({
      sub: checkOpen(items),
      item: pathname,
    });
  }, [pathname]);

  const onCollapse = (val) => {
    setCollapsed(val);
    localStorage.setItem(siderLocalName, val ? "active" : "notActive");
  };

  return (
    <Sider
      className="sales-sider"
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
      <Link to={sales_routes.dashboard}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: collapsed ? "12px 0" : "12px 16px",
            borderBottom: "1px solid #d1fae5",
            marginBottom: 4,
          }}
        >
          {collapsed ? (
            <LazyImage imgUrl={"/images/logo-dark-min.png"} width={36} />
          ) : (
            <LazyImage imgUrl={"/images/logo-dark.png"} width={110} />
          )}
        </div>
      </Link>
      <Menu
        className="sales-sider-menu"
        style={{ height: "calc(100vh - 80px)", overflow: "auto" }}
        selectedKeys={[active.item]}
        defaultOpenKeys={[active.sub]}
        defaultSelectedKeys={[active.item]}
        mode="inline"
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}

export default SalesSider;
