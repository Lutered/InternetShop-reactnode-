//import Cookies from 'js-cookie';
import BasketStore from '../../stores/BasketStore';

import { 
        fetchBasketItems, 
        fetchBasketCount, 
        addBasketItem,
        removeBasketItem,
        changeItemCount 
} from '../http/API/BasketApi';

export default class BasketService{
    _basketStore = null;

    constructor(){
        this._basketStore = new BasketStore();
    }

    getBasketList(){
        return this._basketStore.getBasketList();
    }
    getBasketCount(){
        return this._basketStore.getBasketCount();
    }

    updateBasketItems(){
        const basketStore = this._basketStore;
        const basketId = localStorage.getItem('basketId'); //Cookies.get('basketId');
    
        if(!basketId){
            basketStore.setBasketList([]);
            return;
        }
    
        return fetchBasketItems(basketId).then(data => {
            let basketItems = [];
            data.forEach((val) => {
                basketItems.push({
                    id: val.id,
                    count: val.count,
                    serverCount: val.count, 
                    productId: val.product?.id,
                    name: val.product?.name,
                    price: val.product?.price,
                    img: process.env.REACT_APP_IMAGES_PRODUCTS_FOLDER_URL + val.product?.img
                });
            });
            basketStore.setBasketList(basketItems);
        });
    }

    updateBasketItemsCount(){
        const basketStore = this._basketStore;
        const basketId = localStorage.getItem('basketId'); //Cookies.get('basketId');
    
        if(!basketId){
            basketStore.setBasketCount(0);
            return;
        }
    
        return fetchBasketCount(basketId).then(data => {
            const count = data;
    
            if(count !== basketStore.basketCount)
                basketStore.setBasketCount(count);
        });
    }

    addProductToBasket(productId, config){
        const basketId = localStorage.getItem('basketId');//Cookies.get('basketId');
    
        if(!productId) throw  new Error('Product Id cannot be empty');
    
        return addBasketItem(basketId, productId).then(data => {
            if(!basketId) //Cookies.set('basketId', data.basketId);
                localStorage.setItem('basketId', data.basketId);

            if(config?.updateCount)
                this.updateBasketItemsCount();

            if(config?.updateItems)
                this.updateBasketItems();

            // if(config?.showBasketWnd)
            //     this.showBasketWnd();
        });
    }

    removeProductFromBasket(id, config){
        if(!id) throw  new Error('Product Id cannot be empty');

        return removeBasketItem(id).then(data => {
            if(config.updateCount)
                this.updateBasketItemsCount();

            if(config.updateItems)
                this.updateBasketItems();
        });
    }

    changeItemCount(id, count){
        const basketStore = this._basketStore;

        if(!id) throw  new Error('Product Id cannot be empty');

        changeItemCount(id, count).then(data => {
            basketStore.updateBasketItem(id, {count, serverCount: count});
        });
    }

    updateBasketItem(id, data){
        const basketStore = this._basketStore;

        return basketStore.updateBasketItem(...arguments);
    }
}

