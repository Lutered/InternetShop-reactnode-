import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";

const AppRouter = () => {
    return (
        <Routes>
            {authRoutes.map(({path, Component}) => 
                <Route path={path} element={<Component />} key={path} exact/>
            )}
            
            {publicRoutes.map(({path, Component}) => 
                 <Route path={path} element={<Component />} key={path} exact/>  
            )}
        </Routes>
    )
}

export default AppRouter;