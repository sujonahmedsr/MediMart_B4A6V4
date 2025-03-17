import { Router } from "express";
import authRouter from "../module/User Model/authRouter";
import adminRouter from "../module/admin/adminRouter";
import productsRouter from "../module/products/productsRoute";
import orderRouter from "../module/orders/ordersRouter";
import categoryRoute from "../module/category/categoryRoutes";
const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: authRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/product",
    route: productsRouter,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/order",
    route: orderRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
