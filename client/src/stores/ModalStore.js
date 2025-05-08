import { makeAutoObservable } from "mobx";

export default class ModalStore {
    _isModalHidden = true;

    constructor(){
        makeAutoObservable(this);
    }

    show(){ 
        this._isModalHidden = false; 
    }
    hide(){ 
        this._isModalHidden = true; 
    }

    isModalShowed(){
        return !this._isModalHidden;
    }
};