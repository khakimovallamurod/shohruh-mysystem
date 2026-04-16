import { lazy } from "react";

/* Layout */
export const SupplierLayout = lazy(() => import("../../layout/supplier/SupplierLayout"));

/* SUPPLIER */
export const SupplierNotifChecker = lazy(() => import("../../components/supplier/notification/SupplierNotifChecker"));
export const SupplierHome = lazy(() => import("./home/SupplierHome"));
export const SupplierNotifFromSales = lazy(() => import("./notifFromSales/SupplierNotifFromSales"));
export const SupplierBalance = lazy(() => import("./balance/SupplierBalance"));
export const SupplierDebt = lazy(() => import("./debt/SupplierDebt"));
export const SupplierConfirmSms = lazy(() => import("./confirmSms/SupplierConfirmSms"));
export const SupplierChangeOrder = lazy(() => import("./changeOrder/SupplierChangeOrder"));
export const SupplierReturnProduct = lazy(() => import("./returnProduct/SupplierReturnProduct"));
// export const SupplierReport = lazy(() =>
//   import("./report/SupplierReport")
// );
// export const SupplierReportAll = lazy(() =>
//   import("./reportAll/SupplierReportAll")
// );
export const SupplierSubmittedOrders = lazy(() => import("./submittedOrders/SupplierSubmittedOrders"));
export const SupplierDebtHistory = lazy(() => import("./debt/components/SupplierDebtHistory"));
export const SupplierMyAccount = lazy(() => import("./myAccount/SupplierMyAccount"));
export const SupplierMyTerritory = lazy(() => import("./myTerritory/SupplierMyTerritory"));
export const SupplierMyIndicators = lazy(() => import("./myIndicator/SupplierMyIndicator"));
export const SupplierDeadline = lazy(() => import("./deadline/SupplierDeadline"));
