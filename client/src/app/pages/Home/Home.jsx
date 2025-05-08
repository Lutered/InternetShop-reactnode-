import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import IconGroup from '../../components/IconGroup/IconGroup';
import CategoryCards from '../../components/CategoryCards/CategoryCards';

import globalServices from '../../../services/globalServices';

import {TYPE_DETAIL_ROUTE, SEARCH_ROUTE} from '../../router/routeConsts';

import './home.css';

const HomePage = () => {
    //#region variables
    const productService = globalServices.getProductService();

    const navigate = useNavigate();

    const [typeCards, setTypesCards] = useState([]);
    const [sidebarItems, setSidebarItems] = useState([]);
    //#endregion

    //#region functions
    const openCategoryFn = (category) => {
        let route = `${SEARCH_ROUTE}/${category.typeCode}`;

        if(category.filter) route += `?${category.filter}`;
        
        navigate(route);
    };

    const openTypeFn = (type) => {
        navigate(`${TYPE_DETAIL_ROUTE}/${type.code}`);
    };
    //#endregion

    useEffect(() => {
        productService.getProductTypesAsync().then(productTypes => {
            setSidebarItems(productTypes);
        });

        productService.getCategoriesAsync(1, 4).then(categories => {
            setTypesCards(categories);
        });
    }, []);

    return (
       <div className='main-container container-sidebar'>
              <div className='main-sidebar-container'>
                <Sidebar>
                     <IconGroup sidebarArray={sidebarItems} clickFn={openTypeFn}/>
                 </Sidebar>
             </div>
            <div className='main-content-container'> 
                 <div style={{marginTop: '15px'}}>
                     <h3>Популярные категории</h3>
                    <CategoryCards elements={typeCards} clickFn={openCategoryFn}></CategoryCards>
                </div>
            </div>
       </div>
    )
}

export default HomePage;