import {
  CarFilled,
  CreditCardOutlined,
  DollarOutlined,
  FolderAddOutlined,
  PieChartOutlined,
  SubnodeOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CASHIER_ATTENDANCE_ALWAYS_LATE_ROUTE,
  CASHIER_ATTENDANCE_ROUTE,
  CASHIER_COMPLETED_PRODUCT_DEPART_ROUTE,
  CASHIER_CUTOMER_REPORT_ROUTE,
  CASHIER_EXCHANGE_HISTORY_ROUTE,
  CASHIER_EXPENSES_ROUTE,
  CASHIER_HOME_ROUTE,
  CASHIER_PRODUCT_PROVIDER_ROUTE,
  CASHIER_REPORT_ALL_ROUTE,
  CASHIER_SALARY_ROUTE,
  CASHIER_SUPPLIER_HISTORY_ROUTE,
  CASHIER_SUPPLIER_ROUTE,
} from "../../../util/path";
import LazyImage from "../../common/lazyLoad/LazyImage";

const { Sider } = Layout;

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
  getItem("Asosiy", CASHIER_HOME_ROUTE, <PieChartOutlined />),
  getItem("Taminotchi", "sub1", <FolderAddOutlined />, [
    getItem("Berilgan pullar", CASHIER_PRODUCT_PROVIDER_ROUTE),
    getItem("Hisoboti", CASHIER_REPORT_ALL_ROUTE),
  ]),

  getItem("Dostavkachi", "sub2", <CarFilled />, [
    getItem("Balansi", CASHIER_SUPPLIER_ROUTE),
    getItem("Olingan pullar", CASHIER_SUPPLIER_HISTORY_ROUTE),
  ]),

  getItem(
    "Mijozlardan olingan pullar",
    CASHIER_CUTOMER_REPORT_ROUTE,
    <UsergroupAddOutlined />
  ),
  getItem("Xarajatlar", CASHIER_EXPENSES_ROUTE, <DollarOutlined />),
  getItem("Oylik", CASHIER_SALARY_ROUTE, <CreditCardOutlined />),
  getItem(
    "Tayyor mahsulotlar bo'limi",
    CASHIER_COMPLETED_PRODUCT_DEPART_ROUTE,
    <UnorderedListOutlined />
  ),
  getItem(
    "Ayirboshlanganlar tarixi",
    CASHIER_EXCHANGE_HISTORY_ROUTE,
    <UnorderedListOutlined />
  ),
  // getItem("Davomat", CASHIER_ATTENDANCE_ROUTE, <SubnodeOutlined />),
];

const CashierSider = ({ collapsed, setCollapsed }) => {
  /* Location */
  const { pathname } = useLocation();

  /* Menu open items */
  let checkOpenItemValue = checkOpen(items);

  /* State */
  const [active, setActive] = useState({
    sub: checkOpenItemValue,
    item: pathname,
  });

  /* Navigate */
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === CASHIER_ATTENDANCE_ALWAYS_LATE_ROUTE) {
      setActive({
        sub: checkOpen(items),
        item: CASHIER_ATTENDANCE_ROUTE,
      });
    } else {
      setActive({
        sub: checkOpen(items),
        item: pathname,
      });
    }
  }, [pathname]);

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
      }}
      width={240}
    >
      <Link to={CASHIER_HOME_ROUTE}>
        {collapsed ? (
          <></>
          // <LazyImage imgUrl={"/images/logo-dark-min.png"} width={70} />
        ) : (
          <LazyImage imgUrl={"/images/logo-dark.png"} width={120} />
        )}
      </Link>
      <Menu
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

export default CashierSider;
