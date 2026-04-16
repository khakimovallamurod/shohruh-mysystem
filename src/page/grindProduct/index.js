/* Lazy */
import { lazy } from "react";

/* Layout */
export const GrindProductLayout = lazy(() =>
  import("../../layout/grindProduct/GrindProductLayout")
);

/* Page */
export const GrindOrderSales = lazy(() =>
  import("./orderSales/GrindOrderSales")
);
export const GrindOrderStorage = lazy(() =>
  import("./orderStorage/GrindOrderStorage")
);
export const GrindOutProductFromGrind = lazy(() =>
  import("./outProductFromGrind/GrindOutProductFromGrind")
);
export const GrindRegrind = lazy(() => import("./regrind/GrindRegrind"));
export const GrindProductSpare = lazy(() =>
  import("./productSpare/GrindProductSpare")
);
export const GrindProductRegrindHistory = lazy(() =>
  import("./regrindHistory/GrindProductRegrindHistory")
);
export const GrindProductSpareProduct = lazy(() =>
  import("./productSpareProduct/GrindProductSpareProduct")
);
