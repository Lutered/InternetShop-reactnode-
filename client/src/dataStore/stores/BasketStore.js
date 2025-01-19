import { makeAutoObservable } from "mobx";

export default class BasketStore {
    _basketList = [];
    _basketCount = 0;

    _isBasketHidden = true;

    constructor(){
        makeAutoObservable(this);
    }

    getBasketList(){
        return this._basketList;
    }
    setBasketList(basketList){
        this._basketList = basketList;
        this._basketCount = basketList.reduce((sum, item) => sum + item?.count ?? 0, 0);
    }

    getBasketCount(){
        return this._basketCount;
    }
    setBasketCount(count){
        this._basketCount = count;
    }

    showBasket(){ 
        this._isBasketHidden = false; 
    }
    hideBasket(){ 
        this._isBasketHidden = true; 
    }

    isBasketShowed(){
        return !this._isBasketHidden;
    }

    updateBasketItem(id, data){
        if(!id) throw 'Item id cannot be empty';

        let selectedItem = this._basketList.find(item => item.id == id);

        if(selectedItem === null)  throw 'Item was not found';

        Object.keys(data).forEach(key => {
            let value = data[key];

            selectedItem[key] = value;
        });

        this._basketCount = this._basketList.reduce((sum, item) => sum + item?.count ?? 0, 0);
    }
};