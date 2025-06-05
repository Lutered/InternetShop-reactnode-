import Home from "../pages/Market/Home/Home";
import ProductDetail from "../pages/Market/ProductDetail/ProductDetail";
import TypeDetail from "../pages/Market/TypeDetail/TypeDetail";
import Admin from "../pages/Admin/Admin";
import ProductSearch from "../pages/Market/ProductSearch/ProductSearch";

import ProductTypeDetail from '../pages/Admin/ProductTypeDetail/ProductTypeDetail';

import { 
        HOME_ROUTE, 
        ADMIN_ROUTE, 
        PRODUCT_DETAIL_ROUTE, 
        SEARCH_ROUTE, 
        TYPE_DETAIL_ROUTE,
        ADMIN_TYPE_CREATE_ROUTE
} from "./routeConsts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:`${ADMIN_ROUTE}${ADMIN_TYPE_CREATE_ROUTE}`,
        Component: ProductTypeDetail
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: `${PRODUCT_DETAIL_ROUTE}/:id`,
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