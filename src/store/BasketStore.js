import { makeAutoObservable } from 'mobx';
import { fetchBasket, addDeviceToBasket, deleteDeviceFromBasket } from '../http/basketAPI';

export default class BasketStore {
    _basket = null;
    _devicesInBasket = [];

    constructor() {
        makeAutoObservable(this);
        this._id = ''; 
    }

    setBasket(basket) {
        this._basket = basket;
        this._id = basket._id; 
    }

    setDevicesInBasket(devices) {
        this._devicesInBasket = devices;
    }

    async addDevice(deviceId) {
        try {
            const updatedBasketDevice = await addDeviceToBasket(this._id, deviceId);
            this._devicesInBasket.push(updatedBasketDevice);
        } catch (error) {
            console.error('Ошибка добавления устройства в корзину:', error);
        }
    }

    async removeDevice(deviceId) {
        try {
            await deleteDeviceFromBasket(this._id, deviceId);
            this._devicesInBasket = this._devicesInBasket.filter(
                device => device.device !== deviceId
            );
        } catch (error) {
            console.error('Ошибка удаления устройства из корзины:', error);
        }
    }

    async fetchUserBasket(userId) {
        try {
            const basketData = await fetchBasket(userId);
            this.setBasket(basketData.basket);
            this.setDevicesInBasket(basketData.devices);
        } catch (error) {
            console.error('Ошибка получения корзины пользователя:', error);
        }
    }

    get Basket() {
        return this._basket;
    }

    get devicesInBasket() {
        return this._devicesInBasket;
    }
}
