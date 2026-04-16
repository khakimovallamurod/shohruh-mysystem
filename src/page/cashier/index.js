/* Lazy */
import { lazy } from "react";
/* LAYOUT */
export const CashierLayout = lazy(() =>
  import("../../layout/cashier/CashierLayout")
);

/* PAGES */
export const CashierHome = lazy(() => import("./home/CashierHome"));
export const CashierSupplier = lazy(() => import("./supplier/CashierSupplier"));
// export const CashierDayCost = lazy(() =>
//   import("./dayCost/CashierDayCost")
// );
export const CashierCompletedProductDepartment = lazy(() =>
  import("./compProdDepart/CashierCompletedProductDepartment")
);
export const CashierExpenses = lazy(() => import("./expenses/CashierExpenses"));
export const CashierProductProvider = lazy(() =>
  import("./productProvider/CashierProductProvider")
);
export const CashierSalary = lazy(() => import("./salary/CashierSalary"));
export const CashierCustomerReport = lazy(() =>
  import("./customerReport/CashierCustomerReport")
);
export const CashierExchangeHistory = lazy(() =>
  import("./exchangeHistory/CashierExchangeHistory")
);
export const CashierSupplierHistory = lazy(() =>
  import("./supplierHistory/CashierSupplierHistory")
);
export const CashierAttendance = lazy(() =>
  import("./attendance/CashierAttendance")
);
