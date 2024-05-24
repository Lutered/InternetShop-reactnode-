import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/sidebar.css';
//import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const Sidebar = ({sidebarArray, className}) => {
    const defaultCls = 'sidebar';
    const sidebarClass = className || defaultCls;

    return (
        <>
            <ListGroup className={sidebarClass}>
                {sidebarArray.map((val, index) => 
                    <ListGroup.Item key={index} className="sidebarItem" onClick={val.action}>{val.text}</ListGroup.Item>              
                )}
            </ListGroup>
        </>
    );
}

export default Sidebar;
