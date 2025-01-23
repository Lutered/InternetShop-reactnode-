import React, { Component } from 'react';

import './sidebar.css';

const Sidebar = ({children}) => {
    return (
        <div className='sidebar'>
            {children}
        </div>
    );
}

export default Sidebar;
