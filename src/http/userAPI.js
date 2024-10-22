import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode"

export const registration = async (fullName, email, password) => {
    try {
        const response = await $host.post('/register', {email, password, fullName})
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

export const login = async (email, password) => {
    try {
        const response = await $host.post('/login', {email, password})
        return response.data
    } catch (err) {
        console.warn(err)
    }
}

export const authMe = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await $host.get('/login/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.warn(err);
      return null; // Возвращаем null в случае ошибки
    }
  };