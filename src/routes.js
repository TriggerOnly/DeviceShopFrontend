
import { Admin } from './pages/Admin/Admin'
import {Basket} from './pages/Basket/Basket'
import {FullDevice} from './pages/FullDevice/FullDevice'
import {Login} from './pages/Login/Login'
import {Register} from './pages/Register/Register'
import {Shop} from './pages/Shop/Shop'

/* export const authRoutes = [
    
] */

export const publicRoutes = [
    {
        path: '/admin',
        element: <Admin/>
    },
    {
        path: '/basket',
        element: <Basket/>
    },
    {
        path: '/',
        element: <Shop/>         
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/device/:id',
        element: <FullDevice/>
    }
]