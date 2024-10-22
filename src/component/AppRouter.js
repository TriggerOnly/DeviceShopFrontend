import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import {Shop} from '../pages/Shop/Shop';
import { Context } from '../index';

const AppRouter = () => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {/* {user.isAuth && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )} */}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )}
            <Route path="*" element={<Shop />} /> 
        </Routes>
    );
};

export default AppRouter;