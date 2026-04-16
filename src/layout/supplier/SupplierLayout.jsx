import {
  AuditOutlined,
  DropboxOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomDrawer from "../../components/common/bottomDrawer/BottomDrawer";
import MainMobileHeader from "../../components/common/mobile/header/MainMobileHeader";
import MobileHeaderDrawer from "../../components/common/mobileHeaderDrawer/MobileHeaderDrawer";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SupplierBottomBar from "../../components/supplier/bottomBar/SupplierBottomBar";
import SupplierNotifFromMeDrawer from "../../components/supplier/notification/drawer/SupplierNotifFromMeDrawer";
import SupplierHome from "../../page/supplier/home/SupplierHome";
import {
  SUPPLIER_BALANCE_ROUTE,
  SUPPLIER_CONFIRM_SMS_ROUTE,
  SUPPLIER_HOME_ROUTE,
  SUPPLIER_NOTIF_FROM_SALES_ROUTE,
  SUPPLIER_REPORT_ALL_ROUTE,
  SUPPLIER_REPORT_ROUTE,
  SUPPLIER_RETURN_PRODUCT_ROUTE,
  SUPPLIER_SUBMITTED_ORDERS_ROUTE,
} from "../../util/path";

function SupplierLayout() {
  /* Location */
  const { pathname } = useLocation();

  /* Navigate */
  const navigate = useNavigate();

  /* State */
  const [showPage, setShowPage] = React.useState(false);

  useEffect(() => {
    if (pathname === SUPPLIER_HOME_ROUTE) {
      setShowPage(false);
    } else {
      setShowPage(true);
    }
  }, [pathname]);

  function handleCloseOtherPage() {
    navigate(SUPPLIER_HOME_ROUTE);
  }

  switch (pathname) {
    case SUPPLIER_HOME_ROUTE:
      return (
        <LayoutBox>
          {/* Supplier's Home page */}
          <SupplierHome />
        </LayoutBox>
      );
    case SUPPLIER_CONFIRM_SMS_ROUTE:
      return (
        <LayoutBox fullScreen={true}>
          <MainOutlet />
        </LayoutBox>
      );
    case SUPPLIER_NOTIF_FROM_SALES_ROUTE:
    case SUPPLIER_BALANCE_ROUTE:
      return (
        <LayoutBox>
          {/* Supplier's Home page */}
          <SupplierHome />

          {showPage && pathname !== SUPPLIER_HOME_ROUTE ? (
            <BottomDrawer onClose={handleCloseOtherPage}>
              {/* Outlet */}
              <MainOutlet />
            </BottomDrawer>
          ) : null}
        </LayoutBox>
      );
    default:
      return (
        <LayoutBox>
          {/* Outlet */}
          <MainOutlet />
        </LayoutBox>
      );
  }
}

function LayoutBox({ children, fullScreen }) {
  /* Ref */
  const headerDrawerRef = useRef(null);

  const handleOpenHeaderDrawerMenu = () => {
    headerDrawerRef.current?.onOpen();
  };

  return (
    <div
      style={{
        marginBottom: "100px",
      }}
    >
      {/* Header */}
      <MainMobileHeader
        styles={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClickMenu={handleOpenHeaderDrawerMenu}
        // customItems={<SupplierNotifFromMeDrawer />}
      />

      {/* Drawer menu */}
      <MobileHeaderDrawer
        ref={headerDrawerRef}
        listItems={[
          // {
          //     title: "Mening hisobim",
          //     icon: <UserSwitchOutlined/>,
          //     path: SUPPLIER_MY_ACCOUNT_ROUTE,
          // },
          // {
          //     title: "Mening hududim",
          //     icon: <UserSwitchOutlined/>,
          //     path: SUPPLIER_MY_TERRITORY_ROUTE,
          // },
          {
            title: "Mahsulotni qaytarish",
            icon: <RollbackOutlined />,
            path: SUPPLIER_RETURN_PRODUCT_ROUTE,
          },
          {
            title: "Hisobotlar",
            icon: <AuditOutlined />,
            path: SUPPLIER_REPORT_ROUTE,
          },
          {
            title: "Hamma mijozlarning hisoblari",
            icon: <AuditOutlined />,
            path: SUPPLIER_REPORT_ALL_ROUTE,
          },
          {
            title: "Topshirilgan buyurtmalar",
            icon: <DropboxOutlined />,
            path: SUPPLIER_SUBMITTED_ORDERS_ROUTE,
          },
          // {
          //     title: "Mening ko'rsatkichlarim",
          //     icon: <PieChartOutlined/>,
          //     path: SUPPLIER_MY_INDICATOR,
          // },
          // {
          //     title: "Muddat",
          //     icon: <FieldTimeOutlined/>,
          //     path: SUPPLIER_DEADLINE_ROUTE,
          // },
        ]}
      />

      {children}

      {/* Bottom bar */}
      {!fullScreen ? <SupplierBottomBar /> : null}
    </div>
  );
}

export default SupplierLayout;
