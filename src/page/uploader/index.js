import { lazy } from "react";

/* Layout */
export const UploaderLayout = lazy(() => import("../../layout/uploader/UploaderLayout"));

/* Page */
export const UploaderHome = lazy(() => import("./home/UploaderHome"));
export const UploaderNotifFromGrind = lazy(() => import("./notifFromGrind/UploaderNotifFromGrind"));
export const UploaderNotifFromSales = lazy(() => import("./notifFromSales/UploaderNotifFromSales"));
export const UploaderRegrind = lazy(() => import("./regrind/UploaderRegrind"));
export const UploaderProductReplace = lazy(() => import("./polka/UploaderProductReplace"));
export const UploaderNotifChecker = lazy(() => import("../../components/uploader/notification/UploaderNotifChecker"));
export const UploaderSpare = lazy(() => import("./spare/UploaderSpare"));
export const UploaderProducts = lazy(() => import("./products/UploaderProducts"));
export const UploaderReturnProducts = lazy(() => import("./returnProducts/UploaderReturnProducts"));
export const UploaderReport = lazy(() => import("./report/UploaderReport"));
// export const UploaderReportAll = lazy(() =>
//   import("./reportAll/UploaderReportAll")
// );
export const UploaderReportPateriya = lazy(() => import("./reportPateriya/UploaderReportPateriya"));
export const UploaderOrderGrind = lazy(() => import("./order/orderGrind/UploaderOrderGrind"));
export const UploaderOrderRegrind = lazy(() => import("./order/orderGrind/UploaderOrderRegrind"));
export const UploaderOrderSales = lazy(() => import("./order/orderSales/UploaderOrderSales"));
export const UploaderReportReception = lazy(() => import("./reportReception/UploaderReportReception"));
export const UploaderReportOutputs = lazy(() => import("./reportOutputs/UploaderReportOutputs"));
export const UploaderResidue = lazy(() => import("./residue/UploaderResidue"));
