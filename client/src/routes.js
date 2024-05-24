import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { HOME_ROUTE, ADMIN_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    }
];