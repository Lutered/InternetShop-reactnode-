import { makeAutoObservable } from "mobx";

export default class UserStore{
    _isLoginWndHidden = true;
    _isRegisterWndHiddden = true;

    _user = null;

    constructor(){
        makeAutoObservable(this);
    }

    setUser(user){ this._user = user; }
    getUser(){ return this._user; }
}