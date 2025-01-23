import React, {useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

import CategoryCards from '../../components/CategoryCards/CategoryCards';

import globalServices from '../../../services/globalServices';

function TypeDetail() {
    //#region variables
    const productService = globalServices.getProductService();

    const [categoriesArray, setCategoriesArray] = useState([]);
    const [title, setTitle] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const typeId = searchParams.get('id');
    //#endregion

    const openCategoryFn = (id) => {
        navigate(`/search?categoryId=${id}`);
    };

    useEffect(() => {
        productService.getProductTypeById(typeId).then(type => {
            setTitle(type.name);
        });

        productService.getCategoriesAsync(1, 20, {typeId}).then(categories => {
            setCategoriesArray(categories);
        });
    }, [typeId]);

    return ( 
        <Container className='main-container'>
            <Row>
                <Col>
                    <div style={{margin: '40px 100px'}}>
                        <h2 className='searchTitle'>{title}</h2>
                        <CategoryCards elements = {categoriesArray} clickFn={openCategoryFn}></CategoryCards>
                    </div>
                </Col>
            </Row>
        </Container> 
    );
}

export default TypeDetail;