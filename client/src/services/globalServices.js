import BasketService from './app_services/BasketService';
import ProductService from './app_services/ProductService';

export default class globalServices {
    static basketService;
    static productService;

    static getBasketServices(){
        if(!globalServices.basketService){
            globalServices.basketService = new BasketService();
        }

        return globalServices.basketService;
    }

    static getProductService(){
        if(!globalServices.productService){
            globalServices.productService = new ProductService();
        }

        return globalServices.productService;
    }
};