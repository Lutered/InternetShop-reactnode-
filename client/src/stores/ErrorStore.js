import { makeAutoObservable } from "mobx";

export default class ErrorStore{
    errors = [];

    constructor(){
        makeAutoObservable(this);
    }

    get hasError() {
        return this.errors.length > 0;
    }

    setError(e){
        this.errors.push(e);
    }

    clearErrors(){
        this.errors.clear();
    }
}
