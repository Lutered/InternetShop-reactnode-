import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Sidebar from '../../components/Sidebar/Sidebar';
import IconGroup from '../../components/IconGroup/IconGroup';
import CategoryCards from '../../components/CategoryCards/CategoryCards';

import { fetchProductTypes, fetchCategories } from '../../../services/http/API/ProductApi';

import './home.css';

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
                    text: val.name,
                    icon: val.icon ? (process.env.REACT_APP_ICONS_FOLDER_URL + val.icon) : null
                };
            });
            setSidebarItems(sidebarItemsArray);
        });

        fetchCategories(1, 4).then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    Title: val.name,
                    Img: val.img ? (process.env.REACT_APP_IMAGES_PREVIEW_FOLDER_URL + val.img) : null,
                    action: () => {}
                };
            });
            setTypesCards(array);
        });
    }, []);

    return (
       <div className='main-container d-flex flex-row'>
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
            {/* <Row>
                <Col style={{width:'200px'}}> 
                    <Sidebar>
                        <IconGroup sidebarArray={sidebarItems} clickFn={openTypeFn}/>
                    </Sidebar>
                </Col>
                <Col xs="auto">
                    <div className='home-main-container'> 
                        <h3>Популярные категории</h3>
                        <CategoryCards elements={typeCards} clickFn={openCategoryFn}></CategoryCards>
                    </div>
                </Col>
            </Row> */}
       </div>
    )
}

export default HomePage;