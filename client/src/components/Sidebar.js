import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import '../styles/sidebar.css';

const Sidebar = ({sidebarArray, clickFn}) => {
    return (
        <>
            <ListGroup className='sidebar'>
                {sidebarArray.map((val, index) => 
                    <ListGroup.Item key={index} className="sidebarItem" onClick={() => { clickFn && clickFn(val.id)}}>{val.text}</ListGroup.Item>              
                )}
            </ListGroup>
        </>
    );
}

export default Sidebar;
