import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import './iconGroup.css';

const IconGroup = ({sidebarArray, clickFn}) => {
    return (
        <ListGroup className='iconGroup'>
            {sidebarArray.map((val, index) => 
                <ListGroup.Item key={index} className="iconGroupItem" onClick={() => { clickFn && clickFn(val.id)}}>
                        <div className='iconGroupIconWrapper'>
                            {val.icon ? 
                                <img src={val.icon} className='iconGroupIcon' alt="icon" /> 
                                // <svg width="20" height="20"
                                //     xmlns="http://www.w3.org/2000/svg">
                                //     <use 
                                //         xlinkHref={val.icon}></use>
                                // </svg>
                                : null
                            }
                        </div>
                        <div>{val.text}</div>
                </ListGroup.Item>              
            )}
        </ListGroup>
    );
}

export default IconGroup;
