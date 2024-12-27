import BasketStore from './stores/BasketStore';

export default class globalStores {
    static basketStore;

    static getBasketStore(){
        if(!this.basketStore){
            this.basketStore = new BasketStore();
        }

        return this.basketStore;
    }
};