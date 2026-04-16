/* Lazy */
import { lazy } from "react";
/* LAYOUT */
export const AdminLayout = lazy(() => import("../../layout/admin/AdminLayout"));

/* PAGES */
export const AdminDepartment = lazy(() =>
  import("./department/AdminDepartment")
);
export const AdminHome = lazy(() => import("./home/AdminHome"));
export const AdminPolka = lazy(() => import("./polka/AdminPolka"));
export const AdminProduct = lazy(() => import("./product/AdminProduct"));
export const AdminWorker = lazy(() => import("./worker/AdminWorker"));
export const AdminUser = lazy(() => import("./user/AdminUser"));
export const AdminCustomerCategory = lazy(() =>
  import("./customerCategory/AdminCustomerCategory")
);
export const AdminExpenses = lazy(() => import("./expenses/AdminExpenses"));
export const AdminExpensesCategory = lazy(() =>
  import("./expensesCategory/AdminExpensesCategory")
);
export const AdminDividend = lazy(() => import("./dividend/AdminDividend"));
export const AdminDividendEnclose = lazy(() => import("./dividendEnclose/AdminDividendEnclose"));
export const AdminDividendCategory = lazy(() => import("./dividendCategory/AdminDividendCategory"));

export const AdminResidue = lazy(() => import("./residue/AdminResidue"));
export const AdminReportGrind = lazy(() => import("./reportGrind/AdminReportGrind"));

// Ta'minotchi boshqaruvi
export const AdminSupplierManagement = lazy(() =>
  import("./supplierManagement/AdminSupplierManagement")
);
export const AdminSupplierPayments = lazy(() =>
  import("./supplierManagement/AdminSupplierPayments")
);
export const AdminSupplierReport = lazy(() =>
  import("./supplierManagement/AdminSupplierReport")
);
export const AdminSupplierAllReport = lazy(() =>
  import("./supplierManagement/AdminSupplierAllReport")
);

// Mijoz boshqaruvi
export const AdminCustomerManagement = lazy(() =>
  import("./customerManagement/AdminCustomerManagement")
);
export const AdminCustomerTransactions = lazy(() =>
  import("./customerManagement/AdminCustomerTransactions")
);
export const AdminCustomerReport = lazy(() =>
  import("./customerManagement/AdminCustomerReport")
);

// Ombor va logistika
export const AdminWarehouseTransfer = lazy(() =>
  import("./warehouseManagement/AdminWarehouseTransfer")
);
export const AdminWarehouseMassReport = lazy(() =>
  import("./warehouseManagement/AdminWarehouseMassReport")
);

// Moliya
export const AdminFinanceDebts = lazy(() =>
  import("./financeManagement/AdminFinanceDebts")
);
export const AdminFinanceExpenses = lazy(() =>
  import("./financeManagement/AdminFinanceExpenses")
);
export const AdminFinanceSalary = lazy(() =>
  import("./financeManagement/AdminFinanceSalary")
);

// All department
export const AdminAgentDepart = lazy(() =>
  import("./allDepartment/agent/AdminAgentDepart")
);
export const AdminGrindDepart = lazy(() =>
  import("./allDepartment/grind/AdminGrindDepart")
);
export const AdminSalesDepart = lazy(() =>
  import("./allDepartment/sales/AdminSalesDepart")
);
export const AdminStorageDepart = lazy(() =>
  import("./allDepartment/storage/AdminStorageDepart")
);
export const AdminSupplierDepart = lazy(() =>
  import("./allDepartment/supplier/AdminSupplierDepart")
);
export const AdminUploaderDepart = lazy(() =>
  import("./allDepartment/uploader/AdminUploaderDepart")
);
export const AdminCashierDepart = lazy(() =>
  import("./allDepartment/cashier/AdminCashierDepart")
);
