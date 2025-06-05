import { useState, useEffect } from 'react';
import AdminList from '../AdminList/AdminList';

import globalServices from '../../../../services/globalServices';

function AdminTypes() {
    const [types, setTypes] = useState([]);
    const productService = globalServices.getProductService();

    useEffect(() => {
        productService.getProductTypes().then(productTypes => {
            setTypes(productTypes);
        });
    }, []);
    return ( 
        <div>
            <AdminList items={types}/>
        </div>
    );
}

export default AdminTypes;