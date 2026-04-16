import { Navigate, Route, Routes } from "react-router-dom";
/* Lazy */
import React, { lazy } from "react";

/* Role list */
import { ROLE_LIST } from "./util/const";
/* Path */
import {
  AdminCustomerCategory,
  AdminDepartment,
  AdminExpenses,
  AdminExpensesCategory,
  AdminDividend,
  AdminDividendEnclose,
  AdminDividendCategory,
  AdminHome,
  AdminLayout,
  AdminPolka,
  AdminProduct,
  AdminReportGrind,
  AdminResidue,
  AdminUser,
  AdminWorker,
  AdminSupplierManagement,
  AdminSupplierPayments,
  AdminSupplierReport,
  AdminSupplierAllReport,
  AdminCustomerManagement,
  AdminCustomerTransactions,
  AdminCustomerReport,
  AdminWarehouseTransfer,
  AdminWarehouseMassReport,
  AdminFinanceDebts,
  AdminFinanceExpenses,
  AdminFinanceSalary,
  AgentHome,
  AgentLayout,
  CashierCompletedProductDepartment,
  CashierCustomerReport,
  CashierExchangeHistory,
  CashierExpenses,
  CashierHome,
  CashierLayout,
  CashierProductProvider,
  CashierSalary,
  CashierSupplier,
  CashierSupplierHistory,
  CrmHome,
  CrmLayout,
  GrindOrderSales,
  GrindOrderStorage,
  GrindOutProductFromGrind,
  GrindProductLayout,
  GrindProductRegrindHistory,
  GrindProductSpareProduct,
  GrindRegrind,
  InkasatorLayout,
  PageNotFound,
  PasswordReset,
  ProductStorageReport,
  ProductStorageReportAll,
  RegisterLayout,
  SalesCancelOrderHistory,
  SalesDashboard,
  SalesKassa,
  SalesRazilka,
  SalesSupplierPayments,
  SalesCustomer,
  SalesDailyReceipts,
  SalesHome,
  SalesLayout,
  SalesOrderGrindPage,
  SalesOrderHistory,
  SalesOrderUploader,
  SalesProductSale,
  SalesReport,
  SalesReportAll,
  SalesReportCustomer,
  SalesReturnProduct,
  SignIn,
  StorageCompletedOrder,
  StorageLayout,
  StorageOrderGrind,
  StoragePolka,
  StorageProductSpare,
  StorageProvider,
  StorageReceptionProduct,
  SupplierBalance,
  SupplierChangeOrder,
  SupplierConfirmSms,
  SupplierDebt,
  SupplierDebtHistory,
  SupplierHome,
  SupplierLayout,
  SupplierNotifChecker,
  SupplierNotifFromSales,
  SupplierReturnProduct,
  SupplierSubmittedOrders,
  UploaderHome,
  UploaderLayout,
  UploaderNotifChecker,
  UploaderNotifFromGrind,
  UploaderNotifFromSales,
  UploaderOrderGrind,
  UploaderOrderRegrind,
  UploaderOrderSales,
  UploaderProductReplace,
  UploaderProducts,
  UploaderRegrind,
  UploaderReport,
  UploaderReportOutputs,
  UploaderReportPateriya,
  UploaderReportReception,
  UploaderResidue,
  UploaderReturnProducts,
  UploaderSpare,
} from "./page";

import ThemeMode from "./components/themeMode/ThemeMode";
import {
  AGENT_HOME_ROUTE,
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
  CrmRoutes,
  GRIND_PRODUCT_HOME_ROUTE,
  GRIND_PRODUCT_ORDER_SALES_ROUTE,
  GRIND_PRODUCT_ORDER_STORAGE_ROUTE,
  GRIND_PRODUCT_OUT_PRODUCT_FROM_GRIND_ROUTE,
  GRIND_RESIDUE,
  GRIND_SPARE_PRODUCT_ROUTE,
  HOME_ROUTE,
  InkasatorRoutes,
  LOGIN_ROUTE,
  PASSWORD_RESET_ROUTE,
  PRODUCT_STORAGE_COMPLETED_ORDER_ROUTE,
  PRODUCT_STORAGE_HOME_ROUTE,
  PRODUCT_STORAGE_POLKA_ROUTE,
  PRODUCT_STORAGE_PROVIDER_ROUTE,
  PRODUCT_STORAGE_REPORT_ALL_ROUTE,
  PRODUCT_STORAGE_REPORT_ROUTE,
  PRODUCT_STORAGE_RESIDUE,
  PRODUCT_STORAGE_SKLAD_ROUTE,
  PRODUCT_STORAGE_SPARE_ROUTE,
  SALES_CANCEL_HISTORY_ROUTE,
  SALES_CUSTOMERS_ROUTE,
  SALES_DAILY_RECEIPTS_ROUTE,
  SALES_DASHBOARD_ROUTE,
  SALES_KASSA_ROUTE,
  SALES_RAZILKA_ROUTE,
  SALES_HOME_ROUTE,
  SALES_ORDER_HISTORY_ROUTE,
  SALES_ORDER_TO_GRIND_ROUTE,
  SALES_ORDER_TO_UPLOADER_ROUTE,
  SALES_PRODUCT_SALE_ROUTE,
  SALES_REPORT_CUSTOMER_ROUTE,
  SALES_REPORT_ROUTE,
  SALES_RESOLVED_DEBT_HISTORY_ROUTE,
  SUPPLIER_BALANCE_ROUTE,
  SUPPLIER_CHANGE_ORDER_ROUTE,
  SUPPLIER_CONFIRM_SMS_ROUTE,
  SUPPLIER_DEBT_ROUTE,
  SUPPLIER_HOME_ROUTE,
  SUPPLIER_NOTIF_FROM_SALES_ROUTE,
  SUPPLIER_REPORT_ALL_ROUTE,
  SUPPLIER_REPORT_ROUTE,
  SUPPLIER_RETURN_PRODUCT_ROUTE,
  SUPPLIER_SUBMITTED_ORDERS_ROUTE,
  UPLOADER_HOME_ROUTE,
  UPLOADER_NOTIF_FROM_MAYDALASH_ROUTE,
  UPLOADER_NOTIF_FROM_SALES_ROUTE,
  UPLOADER_ORDER_HISTORY_ROUTE,
  UPLOADER_POLKA_ROUTE,
  UPLOADER_PRODUCTS_ROUTE,
  UPLOADER_REGRIND_ROUTE,
  UPLOADER_REPORT_OUTPUTS_ROUTE,
  UPLOADER_RESIDUE_ROUTE,
  UPLOADER_RETURN_PRODUCT_ROUTE,
  UPLOADER_SALES_ORDER_PROCESS_ROUTE,
  UPLOADER_SPARE_ROUTE,
  admin_routes,
  sales_routes,
} from "./util/path";
/* Authrequired */
const AuthRequired = lazy(() =>
  import("./components/common/authRequired/AuthRequired")
);

function AppRouter() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path={HOME_ROUTE}
        element={<Navigate to={LOGIN_ROUTE} replace={true} />}
      />
      <Route element={<ThemeMode />}>
        {/* PUBLIC ROUTES */}
        <Route element={<RegisterLayout />}>
          <Route path={LOGIN_ROUTE} element={<SignIn />} />
          <Route path={PASSWORD_RESET_ROUTE} element={<PasswordReset />} />
        </Route>

      </Route>

      {/* PROTECTED ROUTES */}
      {/* ADMIN */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.admin]} />}>
        <Route element={<AdminLayout />}>
          <Route path={admin_routes.home} element={<AdminHome />} />
          <Route
            path={admin_routes.department}
            element={<AdminDepartment />}
          />
          <Route path={admin_routes.polka} element={<AdminPolka />} />
          <Route path={admin_routes.product} element={<AdminProduct />} />
          <Route path={admin_routes.workers} element={<AdminWorker />} />
          <Route
            path={admin_routes.customerCategory}
            element={<AdminCustomerCategory />}
          />
          <Route path={admin_routes.user} element={<AdminUser />} />
          <Route path={admin_routes.expenses} element={<AdminExpenses />} />
          <Route
            path={admin_routes.expensesCategory}
            element={<AdminExpensesCategory />}
          />
          <Route path={admin_routes.devident} element={<AdminDividend />} />
          <Route path={admin_routes.devidentEnclose} element={<AdminDividendEnclose />} />
          <Route
            path={admin_routes.devidentCategory}
            element={<AdminDividendCategory />}
          />
          <Route path={admin_routes.residue} element={<AdminResidue />} />
          <Route
            path={admin_routes.reportGrind}
            element={<AdminReportGrind />}
          />

          {/* TA'MINOTCHI BOSHQARUVI */}
          <Route
            path={admin_routes.supplierManagement}
            element={<AdminSupplierManagement />}
          />
          <Route
            path={admin_routes.supplierManagementPayments}
            element={<AdminSupplierPayments />}
          />
          <Route
            path={admin_routes.supplierManagementReport}
            element={<AdminSupplierReport />}
          />
          <Route
            path={admin_routes.supplierManagementAllReport}
            element={<AdminSupplierAllReport />}
          />

          {/* MIJOZ BOSHQARUVI */}
          <Route
            path={admin_routes.customerManagement}
            element={<AdminCustomerManagement />}
          />
          <Route
            path={admin_routes.customerManagementTransactions}
            element={<AdminCustomerTransactions />}
          />
          <Route
            path={admin_routes.customerManagementReport}
            element={<AdminCustomerReport />}
          />

          {/* OMBOR VA LOGISTIKA */}
          <Route
            path={admin_routes.warehouseTransfer}
            element={<AdminWarehouseTransfer />}
          />
          <Route
            path={admin_routes.warehouseMassReport}
            element={<AdminWarehouseMassReport />}
          />

          {/* MOLIYA */}
          <Route
            path={admin_routes.financeDebts}
            element={<AdminFinanceDebts />}
          />
          <Route
            path={admin_routes.financeExpenses}
            element={<AdminFinanceExpenses />}
          />
          <Route
            path={admin_routes.financeSalary}
            element={<AdminFinanceSalary />}
          />

          {/* ALL DEPARTMENT */}
          {/* storage depart */}
          <Route path={admin_routes.storageDepart}>
            <Route
              path={admin_routes.storageDepart}
              element={
                <Navigate
                  to={admin_routes.storageSkladDepart}
                  replace={true}
                />
              }
            />
            <Route
              path={admin_routes.storageSkladDepart}
              element={<StorageReceptionProduct />}
            />
            <Route
              path={admin_routes.storageProviderDepart}
              element={<StorageProvider />}
            />
            <Route
              path={admin_routes.storageOrderFromGrindDepart}
              element={<StorageOrderGrind />}
            />
            <Route
              path={admin_routes.storagePolkaDepart}
              element={<StoragePolka />}
            />
            <Route
              path={admin_routes.storageCompltedOrderDepart}
              element={<StorageCompletedOrder />}
            />
            <Route
              path={admin_routes.storageSpareDepart}
              element={<StorageProductSpare />}
            />
            <Route
              path={admin_routes.storageReportDepart}
              element={<ProductStorageReport />}
            />
            <Route
              path={admin_routes.storageReportCustomerDepart}
              element={<ProductStorageReportAll />}
            />
          </Route>

          {/* Grind depart */}
          <Route path={admin_routes.grindDepart}>
            <Route
              path={admin_routes.grindDepart}
              element={
                <Navigate
                  to={admin_routes.grindOrderFromSalesDepart}
                  replace={true}
                />
              }
            />
            <Route
              path={admin_routes.grindOrderFromSalesDepart}
              element={<GrindOrderSales />}
            />
            <Route
              path={admin_routes.grindOrderFromStorageDepart}
              element={<GrindOrderStorage />}
            />
            <Route
              path={admin_routes.grindOutFromGrindDepart}
              element={<GrindOutProductFromGrind />}
            />
            <Route
              path={admin_routes.grindRegrindDepart}
              element={<GrindRegrind />}
            />
            <Route
              path={admin_routes.grindRegrindHistoryDepart}
              element={<GrindProductRegrindHistory />}
            />
            {/* <Route
                path={AdminRoutes.grindSpareDepart}
                element={<GrindProductSpare />}
              /> */}
            <Route
              path={admin_routes.grindSpareProductsDepart}
              element={<GrindProductSpareProduct />}
            />
          </Route>

          {/* Sales depart */}
          <Route path={admin_routes.salesDepart}>
            <Route
              path={admin_routes.salesDepart}
              element={<Navigate to={admin_routes.salesGrindDepart} />}
            />
            <Route
              path={admin_routes.salesGrindDepart}
              element={<SalesOrderGrindPage />}
            />
            <Route
              path={admin_routes.salesOrderToUploaderDepart}
              element={<SalesOrderUploader />}
            />
            <Route
              path={admin_routes.salesCustomerDepart}
              element={<SalesCustomer />}
            />
            <Route
              path={admin_routes.salesOrderHistoryDepart}
              element={<SalesOrderHistory />}
            />
            <Route
              path={admin_routes.salesOrderReturnedDepart}
              element={<SalesReturnProduct />}
            />
            <Route
              path={admin_routes.salesReportDepart}
              element={<SalesReport />}
            />
            <Route
              path={admin_routes.salesReportCustomerDepart}
              element={<SalesReportCustomer />}
            />
            <Route
              path={admin_routes.salesReportAllDepart}
              element={<SalesReportAll />}
            />
            <Route
              path={admin_routes.salesDailyReceiptsDepart}
              element={<SalesDailyReceipts />}
            />
            <Route
              path={admin_routes.salesResolvedDebtHistory}
              element={<SupplierDebtHistory />}
            />
          </Route>

          {/* Uploader depart */}
          <Route path={admin_routes.uploaderDepart}>
            <Route
              path={admin_routes.uploaderDepart}
              element={<UploaderHome />}
            />
            <Route
              path={admin_routes.uploaderOrderFromGrindProcessDepart}
              element={<UploaderOrderGrind />}
            />
            <Route
              path={admin_routes.uploaderOrderFromSalesProcessDepart}
              element={<UploaderOrderSales />}
            />
            <Route
              path={admin_routes.uploaderReplaceDepart}
              element={<UploaderProductReplace />}
            />
            <Route
              path={admin_routes.uploaderRegrindProcessDepart}
              element={<UploaderOrderRegrind />}
            />
            <Route
              path={admin_routes.uploaderRegrindDepart}
              element={<UploaderRegrind />}
            />
            <Route
              path={admin_routes.uploaderSparePartiyaDepart}
              element={<UploaderSpare />}
            />
            <Route
              path={admin_routes.uploaderReturnedProductsDepart}
              element={<UploaderReturnProducts />}
            />
            <Route
              path={admin_routes.uploaderProductsDepart}
              element={<UploaderProducts />}
            />
            <Route
              path={admin_routes.uploaderOrderToGrindDepart}
              element={<SalesOrderGrindPage />}
            />
            <Route
              path={admin_routes.uploaderOrderHistoryDepart}
              element={<SalesOrderHistory />}
            />
            <Route
              path={admin_routes.uploaderReportDepart}
              element={<UploaderReport />}
            />
            <Route
              path={admin_routes.uploaderReportPateriyaDepart}
              element={<UploaderReportPateriya />}
            />
            <Route
              path={admin_routes.uploaderReportReceptionDepart}
              element={<UploaderReportReception />}
            />
            <Route
              path={admin_routes.uploaderReportOutputDepart}
              element={<UploaderReportOutputs />}
            />
          </Route>

          {/* Agent depart */}
          <Route path={admin_routes.agentDepart}>
            <Route path={admin_routes.agentDepart} element={<AgentHome />} />
          </Route>

          {/* Supplier depart */}
          <Route path={admin_routes.supplierDepart}>
            <Route
              path={admin_routes.supplierDepart}
              element={<SupplierHome />}
            />
            <Route
              path={admin_routes.supplierBalansDepart}
              element={<SupplierBalance />}
            />
            <Route
              path={admin_routes.supplierDebtDepart}
              element={<SupplierDebt />}
            />
            <Route
              path={admin_routes.supplierChangeOrderDepart}
              element={<SupplierChangeOrder />}
            />
            <Route
              path={admin_routes.supplierReturnProductDepart}
              element={<SupplierReturnProduct />}
            />
            <Route
              path={admin_routes.supplierReportDepart}
              element={<SalesReport />}
            />
            <Route
              path={admin_routes.supplierReportCustomerDepart}
              element={<SalesReportCustomer />}
            />
            <Route
              path={admin_routes.supplierSubmittedOrdersDepart}
              element={<SupplierSubmittedOrders />}
            />
          </Route>

          {/* Cashier depart */}
          <Route path={admin_routes.cashierDepart}>
            <Route
              path={admin_routes.cashierDepart}
              element={<CashierHome />}
            />
            <Route
              path={admin_routes.cashierSupplierBalans}
              element={<CashierSupplier />}
            />
            <Route
              path={admin_routes.cashierSupplierGetMoney}
              element={<CashierSupplierHistory />}
            />
            <Route
              path={admin_routes.cashierCustomerGetMoney}
              element={<CashierCustomerReport />}
            />
            <Route
              path={admin_routes.cashierExpenses}
              element={<CashierExpenses />}
            />
            <Route
              path={admin_routes.cashierProviderMoneyGiven}
              element={<CashierProductProvider />}
            />
            <Route
              path={admin_routes.cashierSalary}
              element={<CashierSalary />}
            />
            <Route
              path={admin_routes.cashierProviderReport}
              element={<ProductStorageReportAll />}
            />
            <Route
              path={admin_routes.cashierExchangeHistory}
              element={<CashierExchangeHistory />}
            />
            <Route
              path={admin_routes.cashierCompletedProductSection}
              element={<CashierCompletedProductDepartment />}
            />
          </Route>
        </Route>
      </Route>

      {/* SALES */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.sales]} />}>
        <Route path={SALES_HOME_ROUTE} element={<SalesLayout />}>
          <Route path={SALES_HOME_ROUTE} element={<SalesHome />} />
          <Route path={SALES_DASHBOARD_ROUTE} element={<SalesDashboard />} />
          <Route path={SALES_KASSA_ROUTE} element={<SalesKassa />} />
          <Route path={SALES_RAZILKA_ROUTE} element={<SalesRazilka />} />
          <Route
            path={sales_routes.supplierManagement}
            element={<AdminSupplierManagement />}
          />
          <Route
            path={sales_routes.warehouseTransfer}
            element={<AdminWarehouseTransfer />}
          />
          <Route
            path={sales_routes.financeDebts}
            element={<AdminFinanceDebts />}
          />
          <Route
            path={sales_routes.supplierManagementPayments}
            element={<SalesSupplierPayments />}
          />
          <Route
            path={sales_routes.supplierManagementAllReport}
            element={<AdminSupplierAllReport />}
          />
          <Route
            path={sales_routes.supplierManagementReport}
            element={<AdminSupplierReport />}
          />
          <Route
            path={sales_routes.warehouseMassReport}
            element={<AdminWarehouseMassReport />}
          />
          <Route
            path={sales_routes.customerManagementReport}
            element={<AdminCustomerReport />}
          />
          <Route
            path={sales_routes.customerManagementTransactions}
            element={<AdminCustomerTransactions />}
          />
          <Route
            path={sales_routes.financeExpenses}
            element={<AdminFinanceExpenses />}
          />
          <Route
            path={sales_routes.financeSalary}
            element={<AdminFinanceSalary />}
          />
          <Route
            path={SALES_ORDER_TO_GRIND_ROUTE}
            element={<SalesOrderGrindPage />}
          />
          <Route
            path={SALES_ORDER_TO_UPLOADER_ROUTE}
            element={<SalesOrderUploader />}
          />
          <Route
            path={SALES_PRODUCT_SALE_ROUTE}
            element={<SalesProductSale />}
          />
          <Route
            path={SALES_CUSTOMERS_ROUTE}
            element={<AdminCustomerManagement />}
          />
          <Route
            path={SALES_ORDER_HISTORY_ROUTE}
            element={<SalesOrderHistory />}
          />
          {/* <Route
              path={SALES_RETURN_PRODUCT_ROUTE}
              element={<SalesReturnProduct />}
            /> */}
          <Route path={SALES_REPORT_ROUTE} element={<SalesReport />} />
          <Route
            path={SALES_REPORT_CUSTOMER_ROUTE}
            element={<SalesReportCustomer />}
          />
          {/* <Route path={SALES_REPORT_ALL_ROUTE} element={<SalesReportAll />} /> */}
          <Route
            path={SALES_DAILY_RECEIPTS_ROUTE}
            element={<SalesDailyReceipts />}
          />
          <Route
            path={SALES_CANCEL_HISTORY_ROUTE}
            element={<SalesCancelOrderHistory />}
          />
          <Route
            path={SALES_RESOLVED_DEBT_HISTORY_ROUTE}
            element={<SupplierDebtHistory />}
          />
          <Route
            path={sales_routes.settingsDepartment}
            element={<AdminDepartment />}
          />
          <Route
            path={sales_routes.settingsPolka}
            element={<AdminPolka />}
          />
          <Route
            path={sales_routes.settingsProduct}
            element={<AdminProduct />}
          />
          <Route
            path={sales_routes.settingsWorkers}
            element={<AdminWorker />}
          />
          <Route
            path={sales_routes.settingsCustomerCategory}
            element={<AdminCustomerCategory />}
          />
          <Route
            path={sales_routes.settingsExpensesCategory}
            element={<AdminExpensesCategory />}
          />
        </Route>

        <Route element={<CashierLayout />}>
          <Route path={CASHIER_HOME_ROUTE} element={<CashierHome />} />
          <Route
            path={CASHIER_SUPPLIER_ROUTE}
            element={<CashierSupplier />}
          />
          <Route
            path={CASHIER_SUPPLIER_HISTORY_ROUTE}
            element={<CashierSupplierHistory />}
          />
          <Route
            path={CASHIER_CUTOMER_REPORT_ROUTE}
            element={<CashierCustomerReport />}
          />
          <Route
            path={CASHIER_COMPLETED_PRODUCT_DEPART_ROUTE}
            element={<CashierCompletedProductDepartment />}
          />
          <Route
            path={CASHIER_EXPENSES_ROUTE}
            element={<CashierExpenses />}
          />
          <Route
            path={CASHIER_PRODUCT_PROVIDER_ROUTE}
            element={<CashierProductProvider />}
          />
          <Route path={CASHIER_SALARY_ROUTE} element={<CashierSalary />} />
          <Route
            path={CASHIER_REPORT_ALL_ROUTE}
            element={<ProductStorageReportAll />}
          />
          <Route
            path={CASHIER_EXCHANGE_HISTORY_ROUTE}
            element={<CashierExchangeHistory />}
          />
          {/* <Route path={CASHIER_ATTENDANCE_ROUTE}>
              <Route index element={<CashierAttendance />} />
              <Route
                path={CASHIER_ATTENDANCE_ALWAYS_LATE_ROUTE}
                element={<CashierAttendance />}
              />
              <Route
                path={`*`}
                element={
                  <Navigate to={CASHIER_ATTENDANCE_ROUTE} replace={true} />
                }
              />
            </Route> */}
        </Route>
      </Route>

      {/* CASHIER */}
      {/* <Route element={<AuthRequired allowRoles={[ROLE_LIST.cashier]} />}>
          
        </Route> */}

      {/* STORAGE */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.storage]} />}>
        <Route path={PRODUCT_STORAGE_HOME_ROUTE} element={<StorageLayout />}>
          {/* <Route
              path={PRODUCT_STORAGE_HOME_ROUTE}
              element={<StorageHome />}
            /> */}
          <Route
            path={PRODUCT_STORAGE_HOME_ROUTE}
            element={
              <Navigate to={PRODUCT_STORAGE_SKLAD_ROUTE} replace={true} />
            }
          />
          <Route
            path={PRODUCT_STORAGE_SKLAD_ROUTE}
            element={<StorageReceptionProduct />}
          />
          <Route
            path={PRODUCT_STORAGE_PROVIDER_ROUTE}
            element={<StorageProvider />}
          />
          {/* <Route
              path={PRODUCT_STORAGE_ORDER_GRIND_ROUTE}
              element={<StorageOrderGrind />}
            /> */}

          {/* <Route
            for put polka
            path={PRODUCT_STORAGE_ORDER_RECEPTION_ROUTE}
            element={<StorageOrderReception />}
          /> */}
          <Route
            path={PRODUCT_STORAGE_POLKA_ROUTE}
            element={<StoragePolka />}
          />
          <Route
            path={PRODUCT_STORAGE_COMPLETED_ORDER_ROUTE}
            element={<StorageCompletedOrder />}
          />
          <Route
            path={PRODUCT_STORAGE_SPARE_ROUTE}
            element={<StorageProductSpare />}
          />
          <Route
            path={PRODUCT_STORAGE_REPORT_ROUTE}
            element={<ProductStorageReport />}
          />
          <Route
            path={PRODUCT_STORAGE_REPORT_ALL_ROUTE}
            element={<ProductStorageReportAll />}
          />
          <Route
            path={PRODUCT_STORAGE_RESIDUE}
            element={<UploaderResidue />}
          />
        </Route>

        <Route
          path={GRIND_PRODUCT_HOME_ROUTE}
          element={<GrindProductLayout />}
        >
          <Route
            path={GRIND_PRODUCT_HOME_ROUTE}
            element={
              <Navigate to={GRIND_PRODUCT_ORDER_SALES_ROUTE} replace={true} />
            }
          />
          <Route
            path={GRIND_PRODUCT_ORDER_SALES_ROUTE}
            element={<GrindOrderSales />}
          />
          <Route
            path={GRIND_PRODUCT_ORDER_STORAGE_ROUTE}
            element={<GrindOrderStorage />}
          />
          <Route
            path={GRIND_PRODUCT_OUT_PRODUCT_FROM_GRIND_ROUTE}
            element={<GrindOutProductFromGrind />}
          />
          {/* <Route path={GRIND_REGRIND_ROUTE} element={<GrindRegrind />} />
            <Route
              path={GRIND_REGRIND_HISTORY_ROUTE}
              element={<GrindProductRegrindHistory />}
            /> */}
          {/* <Route path={GRIND_SPARE_ROUTE} element={<GrindProductSpare />} /> */}
          <Route
            path={GRIND_SPARE_PRODUCT_ROUTE}
            element={<GrindProductSpareProduct />}
          />
          {/* <Route
              path={GRIND_REPORT_PATERIYA_ROUTE}
              element={<UploaderReportPateriya />}
            /> */}
          <Route path={GRIND_RESIDUE} element={<UploaderResidue />} />
        </Route>
      </Route>

      {/* GRIND */}
      {/* <Route element={<AuthRequired allowRoles={[ROLE_LIST.grind]} />}>
          
        </Route> */}

      {/* UPLOADER */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.uploader, ROLE_LIST.storage, ROLE_LIST.grind]} />}>
        <Route element={<UploaderNotifChecker />}>
          <Route path={UPLOADER_HOME_ROUTE} element={<UploaderLayout />}>
            <Route
              path={UPLOADER_HOME_ROUTE}
              element={
                <Navigate
                  to={UPLOADER_SALES_ORDER_PROCESS_ROUTE}
                  replace={true}
                />
              }
            />
            {/* <Route
                path={UPLOADER_GRIND_ORDER_PROCESS_ROUTE}
                element={<UploaderOrderGrind />}
              />
              <Route
                path={UPLOADER_REGRIND_ORDER_PROCESS_ROUTE}
                element={<UploaderOrderRegrind />}
              /> */}
            <Route
              path={UPLOADER_SALES_ORDER_PROCESS_ROUTE}
              element={<UploaderOrderSales />}
            />

            <Route
              path={UPLOADER_NOTIF_FROM_MAYDALASH_ROUTE}
              element={<UploaderNotifFromGrind />}
            />
            <Route
              path={UPLOADER_NOTIF_FROM_SALES_ROUTE}
              element={<UploaderNotifFromSales />}
            />
            <Route
              path={UPLOADER_POLKA_ROUTE}
              element={<UploaderProductReplace />}
            />
            <Route
              path={UPLOADER_REGRIND_ROUTE}
              element={<UploaderRegrind />}
            />
            {/* <Route path={UPLOADER_SPARE_ROUTE} element={<UploaderSpare />} /> */}
            <Route
              path={UPLOADER_RETURN_PRODUCT_ROUTE}
              element={<UploaderReturnProducts />}
            />
            <Route
              path={UPLOADER_PRODUCTS_ROUTE}
              element={<UploaderProducts />}
            />
            {/* <Route
                path={UPLOADER_ORDER_GRIND_ROUTE}
                element={<SalesOrderGrindPage />}
              /> */}
            {/* <Route
                path={UPLOADER_REPORT_ROUTE}
                element={<UploaderReport />}
              /> */}
            {/* <Route
              path={UPLOADER_REPORT_ALL_ROUTE}
              element={<UploaderReportAll />}
            /> */}
            <Route
              path={UPLOADER_ORDER_HISTORY_ROUTE}
              element={<SalesOrderHistory />}
            />
            {/* <Route
                path={UPLOADER_REPORT_PATERIYA_ROUTE}
                element={<UploaderReportPateriya />}
              /> */}
            {/* <Route
                path={UPLOADER_REPORT_RECEPTION_ROUTE}
                element={<UploaderReportReception />}
              /> */}
            <Route
              path={UPLOADER_REPORT_OUTPUTS_ROUTE}
              element={<UploaderReportOutputs />}
            />
            <Route
              path={UPLOADER_RESIDUE_ROUTE}
              element={<UploaderResidue />}
            />
          </Route>
        </Route>
      </Route>

      {/* AGENT */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.agent]} />}>
        <Route path={AGENT_HOME_ROUTE} element={<AgentLayout />}>
          <Route path={AGENT_HOME_ROUTE} element={<AgentHome />} />
        </Route>
      </Route>

      {/* SUPPLIER */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.supplier]} />}>
        <Route element={<SupplierNotifChecker />}>
          <Route element={<SupplierLayout />}>
            <Route path={SUPPLIER_HOME_ROUTE} element={<SupplierHome />} />
            <Route
              path={SUPPLIER_NOTIF_FROM_SALES_ROUTE}
              element={<SupplierNotifFromSales />}
            />
            <Route path={SUPPLIER_DEBT_ROUTE} element={<SupplierDebt />} />
            <Route
              path={SUPPLIER_BALANCE_ROUTE}
              element={<SupplierBalance />}
            />
            <Route
              path={SUPPLIER_CONFIRM_SMS_ROUTE}
              element={<SupplierConfirmSms />}
            />
            <Route
              path={SUPPLIER_CHANGE_ORDER_ROUTE}
              element={<SupplierChangeOrder />}
            />
            <Route
              path={SUPPLIER_RETURN_PRODUCT_ROUTE}
              element={<SupplierReturnProduct />}
            />
            <Route path={SUPPLIER_REPORT_ROUTE} element={<SalesReport />} />
            <Route
              path={SUPPLIER_REPORT_ALL_ROUTE}
              element={<SalesReportCustomer />}
            />
            <Route
              path={SUPPLIER_SUBMITTED_ORDERS_ROUTE}
              element={<SupplierSubmittedOrders />}
            />
            {/* <Route
                path={SUPPLIER_MY_ACCOUNT_ROUTE}
                element={<SupplierMyAccount />}
              /> */}
            {/* <Route
                path={SUPPLIER_MY_TERRITORY_ROUTE}
                element={<SupplierMyTerritory />}
              /> */}
            {/* <Route
                path={SUPPLIER_MY_INDICATOR}
                element={<SupplierMyIndicators />}
              />
              <Route
                path={SUPPLIER_DEADLINE_ROUTE}
                element={<SupplierDeadline />}
              /> */}
          </Route>
        </Route>
      </Route>

      {/* CRM */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.crm]} />}>
        <Route element={<CrmLayout />}>
          <Route path={CrmRoutes.home} element={<CrmHome />} />
          <Route
            path={CrmRoutes.orderHistory}
            element={<SalesOrderHistory />}
          />
          <Route path={CrmRoutes.customerData} element={<SalesCustomer />} />
        </Route>
      </Route>

      {/* Inkasator */}
      <Route element={<AuthRequired allowRoles={[ROLE_LIST.inkasator]} />}>
        <Route element={<InkasatorLayout />}>
          <Route
            path={InkasatorRoutes.home}
            element={<Navigate to={InkasatorRoutes.debt} replace={true} />}
          />
          <Route path={InkasatorRoutes.debt} element={<SupplierDebt />} />
        </Route>
      </Route>

      {/* CATCH ALL */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouter;
