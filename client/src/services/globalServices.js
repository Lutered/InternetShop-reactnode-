import BasketService from './app_services/BasketService';
import ProductService from './app_services/ProductService';
import UserService from './app_services/UserService';
import ModalService from './app_services/ModalService';
import ErrorService from './app_services/ErrorService';

export default class globalServices {
    static basketService;
    static productService;
    static userService;
    static modalService;
    static errorService;

    static getBasketService(){
        if(!globalServices.basketService){
            globalServices.basketService = new BasketService();
        }

        return globalServices.basketService;
    }

    static getProductService(){
        if(!globalServices.productService){
            globalServices.productService = new ProductService(globalServices.getErrorService());
        }

        return globalServices.productService;
    }

    static getUserService(){
        if(!globalServices.userService){
            globalServices.userService = new UserService();
        }

        return globalServices.userService;
    }

    static getModalService(){
        if(!globalServices.modalService){
            globalServices.modalService  = new ModalService();
        }

        return globalServices.modalService;
    }

    static getErrorService(){
        if(!globalServices.errorService){
            globalServices.errorService = new ErrorService();
        }

        return globalServices.errorService;
    }
};