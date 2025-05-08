import Home from "../pages/Home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import TypeDetail from "../pages/TypeDetail/TypeDetail";
import Admin from "../pages/Admin/Admin";
import ProductSearch from "../pages/ProductSearch/ProductSearch";

import { 
        HOME_ROUTE, 
        ADMIN_ROUTE, 
        PRODUCT_DETAIL_ROUTE, 
        SEARCH_ROUTE, 
        TYPE_DETAIL_ROUTE
} from "./routeConsts";

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
        path: `${SEARCH_ROUTE}/:productType?`,
        Component: ProductSearch
    },
    {
        path: `${TYPE_DETAIL_ROUTE}/:productType`,
        Component: TypeDetail
    }
];