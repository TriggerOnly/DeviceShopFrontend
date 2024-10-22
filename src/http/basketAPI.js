import { $authHost } from "."

export const createBasket = async () => {
    try {
        const response = await $authHost.post('/createBasket');
        return response.data;  
    } catch (error) {
        console.error('Ошибка создания корзины:', error);
        throw error;
    }
};

export const addDeviceToBasket = async ({ deviceId, device, basket }) => {
    try {
        const response = await $authHost.post(`/addDeviceToBasket/${deviceId}`, {
            device,
            basket
        })

        return response.data;
    } catch (err) {
        console.log(err);
        alert('Ошибка при отправке девайса на сервер в корзину');
    }
}

export const fetchBasket = async () => {
    try {
        
    } catch (err) {
        
    }
}

export const deleteDeviceFromBasket = async (deviceId) => {
    try {
        const response = await $authHost.delete(`/deleteDeviceFromBasket/${deviceId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        alert('Ошибка при удалении девайса из корзины');
    }
}


export const getDevicesInBasket = async () => {
    try {
        const response = await $authHost.get('/basketDevices')
        
        return response.data
    } catch (error) {
        console.log(error)
        alert('Ошибка при загрузке девайсов в корзине');
    }
}