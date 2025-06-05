import UserStore from '../../stores/UserStore';

import {
    login,
    register
} from '../http/API/AuthApi';

//import Cookies from 'js-cookie';

export default class UserService{
    _authToken = 'AuthToken';
    _userStore = null;

    constructor(){
        this._userStore = new UserStore();
    }
    
    login(email, password){ 
        const me = this;
        return login(email, password).then(data => {
            me.setAuthToken(data.token);
        }); 
    };

    register(name, email, password){ 
        const me = this;
        return register(name, email, password).then(data => {
            me.setAuthToken(data.token);
        });  
    }

    updateAuthToken(){
        const token = this.getAuthToken();
        if(token) this.setAuthToken(token);
    }

    setUser(userJson){
        this._userStore.setUser({
            id: userJson.id,
            name: userJson.name,
            email: userJson.email
        });
    }

    getUser(){ 
        return this._userStore.getUser(); 
    }

    getAuthToken(){
        //return Cookies.get(this._authToken) ?? '';
        return localStorage.getItem(this._authToken) ?? '';
    }

    setAuthToken(token){
        //Cookies.set(this._authToken, token);
        localStorage.setItem(this._authToken, token);
        const userJson =  this.parseJwt(token);
        this.setUser(userJson);
    }

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
}