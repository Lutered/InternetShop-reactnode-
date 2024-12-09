import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import TypeDetail from "./pages/TypeDetail";
import Admin from "./pages/Admin";
import Search from "./pages/Search";

import { 
        HOME_ROUTE, 
        ADMIN_ROUTE, 
        PRODUCT_DETAIL_ROUTE, 
        SEARCH_ROUTE, 
        TYPE_DETAIL_ROUTE 
} from "./utils/consts";

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
        path: PRODUCT_DETAIL_ROUTE,
        Component: ProductDetail
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
    {
        path: TYPE_DETAIL_ROUTE,
        Component: TypeDetail
    },
];