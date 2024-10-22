import { makeAutoObservable } from 'mobx';
import { authMe } from '../http/userAPI';

export default class UserStore {
    _isAuth = false;  
    _user = {}; 

    constructor() {
        makeAutoObservable(this);
        this.checkLocalAuth(); 
    }

    checkLocalAuth() {
        const token = localStorage.getItem('token'); 
        if (token) {
            this.checkAuth();
        } else {
            this.setIsAuth(false);  
        }
    }

    async checkAuth() {
        try {
            const user = await authMe(); 
            this.setUser(user);
            this.setIsAuth(true); 
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            this.setIsAuth(false); 
        }
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get User() {
        return this._user;
    }
}
