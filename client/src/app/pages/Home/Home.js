import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Sidebar from '../../components/Sidebar/Sidebar';
import CategoryCards from '../../components/CategoryCards/CategoryCards';

import { fetchProductTypes, fetchCategories } from '../../../services/http/API/ProductApi';

import '../page.css';

const HomePage = () => {
    const [typeCards, setTypesCards] = useState([]);
    const [sidebarItems, setSidebarItems] = useState([]);

    const navigate = useNavigate();

    const openCategoryFn = (id) => {
        navigate(`/search?categoryId=${id}`);
    };

    const openTypeFn = (id) => {
        navigate(`/type?id=${id}`);
    };

    useEffect(() => {
        fetchProductTypes().then(data => {
            const sidebarItemsArray = data.rows.map(val => {
                return {
                    id: val.id,
                    text: val.name
                };
            });
            setSidebarItems(sidebarItemsArray);
        });

        fetchCategories().then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    Title: val.name,
                    Img: val.img ? (process.env.REACT_APP_API_URL + '/photos/' + val.img) : null,
                    action: () => {}
                };
            });
            setTypesCards(array);
        });
    }, []);

    return (
       <Container className='maincontainer'>
            <Row>
                <Col xs={3}>
                    <Sidebar sidebarArray={sidebarItems} clickFn={openTypeFn}/>
                </Col>
                <Col xs={9}>
                    <div style={{marginTop: '50px'}}> 
                        <h3>Популярные категории</h3>
                        <CategoryCards elements={typeCards} clickFn={openCategoryFn}></CategoryCards>
                    </div>
                </Col>
            </Row>
       </Container>
    )
}

export default HomePage;