import { makeAutoObservable } from "mobx";

export default class BasketStore {
    basketList = [];
    basketCount = 0;

    isBasketHidden = true;

    constructor(){
        makeAutoObservable(this);
    }

    setBasketList(_basketList){
        this.basketList = _basketList;
        this.basketCount = _basketList.reduce((sum, item) => sum + item?.count ?? 0, 0);
    }

    setBasketCount(count){
        this.basketCount = count;
    }

    showBasket(){ 
        this.isBasketHidden = false; 
    }
    hideBasket(){ 
        this.isBasketHidden = true; 
    }
    getShowBasket(){
        return !this.isBasketHidden;
    }

    updateBasketItem(id, data){
        if(!id) throw 'Item id cannot be empty';

        let selectedItem = this.basketList.find(item => item.id == id);

        if(selectedItem === null)  throw 'Item was not found';

        Object.keys(data).forEach(key => {
            let value = data[key];

            selectedItem[key] = value;
        });

        this.basketCount = this.basketList.reduce((sum, item) => sum + item?.count ?? 0, 0);
    }
};