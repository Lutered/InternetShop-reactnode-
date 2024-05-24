import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE} from '../utils/consts';
import HomePage from '../pages/Home';

const AppRouter = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {authRoutes.map(({path, Component}) => 
                <Route path={path} element={<Component />} key={path} exact/>
            )}
            
            {publicRoutes.map(({path, Component}) => 
                 <Route path={path} element={<Component />} key={path} exact/>  
            )}
        </Routes>
    )
}

{/* <Route
path="*"
element={<Navigate to="/" replace={true} />}
/> */}

export default AppRouter;