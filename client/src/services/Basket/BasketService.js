import Cookies from 'js-cookie';

import { 
        fetchBasketItems, 
        fetchBasketCount, 
        addBasketItem,
        removeBasketItem,
        changeItemCount 
} from '../http/API/BasketApi';

import globalStores from '../../dataStore/globalStores';

export default class BasketService{
    static showBasketWnd(){
        const basketStore = globalStores.getBasketStore();

        basketStore.showBasket();
        BasketService.updateBasketItems();
    } 

    static hideBasketWnd(){
        const basketStore = globalStores.getBasketStore();

        basketStore.hideBasket();
    } 

    static updateBasketItems(){
        const basketStore = globalStores.getBasketStore();
        const basketId = Cookies.get('basketId');
    
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
                    img: process.env.REACT_APP_IMAGES_FOLDER_URL + val.product?.img
                });
            });
            basketStore.setBasketList(basketItems);
        });
    }

    static updateBasketItemsCount(){
        const basketStore = globalStores.getBasketStore();
        const basketId = Cookies.get('basketId');
    
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

    static addProductToBasket(productId, config){
        const basketId = Cookies.get('basketId');
    
        if(!productId) throw 'Product Id cannot be empty';
    
        return addBasketItem(basketId, productId).then(data => {
            if(!basketId) Cookies.set('basketId', data.basketId);
            
            if(config.updateCount)
                BasketService.updateBasketItemsCount();

            if(config.updateItems)
                BasketService.updateBasketItems();

            if(config.showBasketWnd)
                BasketService.showBasketWnd();
        });
    }

    static removeProductFromBasket(id, config){
        if(!id) throw 'Product Id cannot be empty';

        return removeBasketItem(id).then(data => {
            if(config.updateCount)
                BasketService.updateBasketItemsCount();

            if(config.updateItems)
                BasketService.updateBasketItems();
        });
    }

    static changeItemCount(id, count){
        const basketStore = globalStores.getBasketStore();

        if(!id) throw 'Product Id cannot be empty';

        changeItemCount(id, count).then(data => {
            basketStore.updateBasketItem(id, {count, serverCount: count});
        });
    }
}

