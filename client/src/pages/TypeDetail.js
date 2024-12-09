import React, {useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

import Sidebar from '../components/Sidebar';
import CategoryCards from '../components/CategoryCards';
import { fetchCategories, fetchProductTypeById } from '../http/ProductApi';

import '../styles/page.css';

function TypeDetail() {
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [title, setTile] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const typeId = searchParams.get('id');

    const openCategoryFn = (id) => {
        navigate(`/search?categoryId=${id}`);
    };

    useEffect(() => {
        fetchProductTypeById(typeId).then(data => {
            setTile(data.name);
        });

        fetchCategories(1, 20, {typeId}).then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    Title: val.name,
                    Img: val.img ? (process.env.REACT_APP_API_URL + '/photos/' + val.img) : null
                };
            });
            setCategoriesArray(array);
        });
    }, [typeId]);

    return ( 
        <Container className='maincontainer'>
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