import BasketStore from './store/BasketStore';

export default class globalStores {
    static basketStore;

    static getBasketStore(){
        if(!this.basketStore){
            this.basketStore = new BasketStore();
        }

        return this.basketStore;
    }
};