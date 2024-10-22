import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode"

//TYPE
export const createType = async (type) => {
    try {
        const response = await $authHost.post('/type', type)
        return response
    } catch (err) {
        console.warn(err)
    }
}

export const fetchTypes = async () => {
    try {
        const response = await $host.get('/types/All')
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

//BRAND
export const createBrand = async (brand) => {
    try {
        const response = await $authHost.post('/brand', brand)
        return response
    } catch (err) {
        console.warn(err)
    }
}

export const fetchBrands = async () => {
    try {
        const response = await $host.get('/brands/All')
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

//DEVICE
export const createDevice = async (device) => {
    try {
        const response = await $authHost.post('/device', device)
        return response
    } catch (err) {
        console.warn(err)
    }
}

export const fetchDevice = async () => {
    try {
        const response = await $host.get('/device')        
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

export const fetchOneDevice = async (_id) => {
    try {
        const response = await $host.get(`/device/` + _id)
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

export const createDeviceInfo = async (formDataArray) => {
    try {
      for (const formData of formDataArray) {
        console.log(formData);

        const response = await $host.post(`/deviceInfo/` + formData.deviceId, formData);
        
        console.log(response);
      }
  
      return true; 
    } catch (err) {
      console.warn(err);
    }
};  

export const fetchDeviceInfo = async (_id) => {
    try {
        const response = await $host.get(`/deviceInfo/` + _id)
        
        if(!response) {
            alert('Информация о девайсе отсутствует')
        }
        
        return response.data
    } catch (err) {
        console.log(err);
        alert('Не удалось загрузить информацию о девайсе')
    }
}

export const uploadFile = async (formData) => {
    try {
        console.log('Отправляемые данные:', formData);
        const response = await $host.post('/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Ответ от сервера:', response);
        return response;
    } catch (err) {
        console.error('Ошибка при загрузке файла:', err);
        throw err;
    }
};
