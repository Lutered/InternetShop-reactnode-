import React from 'react';

import './sidebar.css';

const Sidebar = ({children, style}) => {
    if(!style){
        style = {
            height: 'calc(100dvh - var(--nav-height))',
            position: 'sticky',
            top: 'var(--nav-height)'
        };
    }

    return (
        <div 
            className='sidebar'
            style={style}
        >
            {children}
        </div>
    );
}

export default Sidebar;
