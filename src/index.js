import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore'
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import './index.scss'
import BasketStore from './store/BasketStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <Context.Provider value={{
                user: new UserStore(),
                device: new DeviceStore(),
                basket: new BasketStore()
            }}>
                <App />
            </Context.Provider>
        </ThemeProvider>
    </>
);
