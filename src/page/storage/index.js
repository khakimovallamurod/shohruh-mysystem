import { lazy } from "react";

/* Layout */
export const StorageLayout = lazy(() =>
  import("../../layout/productStorage/StorageLayout")
);

/* Page */
export const StorageHome = lazy(() => import("./home/StorageHome"));
export const StorageCompletedOrder = lazy(() =>
  import("./completedOrder/StorageCompletedOrder")
);
export const StorageOrderGrind = lazy(() =>
  import("./orderGrind/StorageOrderGrind")
);
export const StorageOrderReception = lazy(() =>
  import("./orderReception/StorageOrderReception")
);
export const StoragePolka = lazy(() => import("./polka/StoragePolka"));
export const StorageReceptionProduct = lazy(() =>
  import("./receptionProduct/StorageReceptionProduct")
);
export const StorageProductSpare = lazy(() =>
  import("./productSpare/StorageProductSpare")
);
export const ProductStorageReport = lazy(() =>
  import("./report/ProductStorageReport")
);
export const ProductStorageReportAll = lazy(() =>
  import("./reportAll/ProductStorageReportAll")
);
export const StorageProvider = lazy(() => import("./provider/StorageProvider"));
