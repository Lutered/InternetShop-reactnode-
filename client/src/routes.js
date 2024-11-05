import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import { HOME_ROUTE, ADMIN_ROUTE, DETAIL_ROUTE, SEARCH_ROUTE } from "./utils/consts";

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
    },
    {
        path: DETAIL_ROUTE,
        Component: Detail
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
];