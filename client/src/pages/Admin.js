import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../components/Sidebar';

import Products from '../components/admin/Products';
import Types from '../components/admin/Types';

function Admin() {
    const [activeSBItem, setActiveSBItem] = useState(0);

    const sidebarItemsArray = [
        { 
            text: "Типы", 
            action: () => {setActiveSBItem(0)}, 
            el: (<Types />)
        },
        { 
            text: "Бренды", 
            action: () => {setActiveSBItem(1)}, 
            el: <p>Test2</p> 
        },
        { 
            text: "Продукция", 
            action: () => {setActiveSBItem(2)}, 
            el: (<Products />)
        },
        { 
            text: "Продавцы", 
            action: () => {setActiveSBItem(3)} 
        },
        { 
            text: "Пользователи", 
            action: () => {setActiveSBItem(4)}
        }
    ];

    return ( 
        <Container className='maincontainer' >
            <Row>
                <Col xs={3}> 
                    <Sidebar sidebarArray={sidebarItemsArray}/>
                </Col>
                <Col xs={9}>
                    {sidebarItemsArray[activeSBItem].el}
                </Col>
            </Row>
        </Container>
     );
}

export default Admin;