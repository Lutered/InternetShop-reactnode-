import BasketService from './Basket/BasketService';

export default class globalServices {
    static basketService;

    static getBasketServices(){
        if(!this.basketService){
            this.basketService = new BasketService();
        }

        return this.basketService;
    }
};