import React, { useState } from 'react';

import IconGroup from '../../components/IconGroup/IconGroup';

import Sidebar from '../../components/Sidebar/Sidebar';
import AdminProducts from '../../components/Admin/AdminProducts/AdminProducts';
import AdminTypes from '../../components/Admin/AdminTypes/AdminTypes-list';

function Admin() {
    // const [activeSBItem, setActiveSBItem] = useState(0);

    // const sidebarItemsArray = [
    //     { 
    //         text: "Типы", 
    //         action: () => {setActiveSBItem(0)}, 
    //         el: (<AdminTypes />)
    //     },
    //     { 
    //         text: "Бренды", 
    //         action: () => {setActiveSBItem(1)}, 
    //         el: <p>Test2</p> 
    //     },
    //     { 
    //         text: "Продукция", 
    //         action: () => {setActiveSBItem(2)}, 
    //         el: (<AdminProducts />)
    //     },
    //     { 
    //         text: "Продавцы", 
    //         action: () => {setActiveSBItem(3)} 
    //     },
    //     { 
    //         text: "Пользователи", 
    //         action: () => {setActiveSBItem(4)}
    //     }
    // ];

    const [sidebarItems, setSidebarItems] = useState([{
        name: 'Типы'
    },{
        name: 'Категории'
    },{
        name: 'Пользователи'
    },{
        name: 'Мои товары'
    }]);

    const sidebarClickFn = (rec) => {

    }

    return ( 
        <div className='main-container container-sidebar'>
            <div className='main-sidebar-container'>
                <Sidebar>
                     <IconGroup sidebarArray={sidebarItems} clickFn={sidebarClickFn}/>
                 </Sidebar>
            </div>
            <div className='main-content-container'> 
                <div
                 style={{
                    height: '100%'
                 }}>
                    <AdminTypes />
                 </div>
            </div>
       </div>
     );
}

export default Admin;