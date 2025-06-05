import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

import CategoryCards from '../../../components/CategoryCards/CategoryCards';

import {SEARCH_ROUTE} from '../../../router/routeConsts';

import globalServices from '../../../../services/globalServices';

import './typeDetail.css';

function TypeDetail() {
    //#region variables
    const productService = globalServices.getProductService();

    const [categoriesArray, setCategoriesArray] = useState([]);
    const [title, setTitle] = useState('');

    const pathParams = useParams();
    const navigate = useNavigate();

    const productTypeCode = pathParams.productType;
    //#endregion

    const openCategoryFn = (category) => {
       let route = `${SEARCH_ROUTE}/${category.typeCode}`;
       
        if(category.filter) route += `?${category.filter}`;
        
        navigate(route);
    };

    useEffect(() => {
        productService.getProductType(productTypeCode).then(type => {
            setTitle(type.name);
        });

        productService.getCategoriesAsync(1, 20, {typeCode: productTypeCode}).then(categories => {
            setCategoriesArray(categories);
        });
    }, [productTypeCode]);

    return ( 
        <Container className='main-container'>
            <Row>
                <Col className='typeDetail-container'>
                    <h2 className='searchTitle typeDetail-title'>{title}</h2>
                    <div>
                        <CategoryCards elements = {categoriesArray} clickFn={openCategoryFn}></CategoryCards>
                    </div>
                </Col>
            </Row>
        </Container> 
    );
}

export default TypeDetail;