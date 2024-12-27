import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductCards from '../../components/ProductCards/ProductCards';
import PaginationPanel from '../../components/Paggination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';

import BasketService from '../../../services/Basket/BasketService';

import { fetchProductTypes, searchProducts, fetchCategoryById } from '../../../services/http/API/ProductApi';

import '../page.css';

const ProductSearch = () => {
    const pageLimit = 9;

    const [cardsArray, setCards] = useState([]);
    //const [currentPage, setPage] = useState(1);
    const [numberOfPages, setTotalPages] = useState(1);
    const [searchTitle, setSearchTitle] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const categoryId = searchParams.get('categoryId');
    const brandId = searchParams.get('brandId');
    const searchValue = searchParams.get('search');
    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const openCardFn = (id) => {
        navigate(`/product?id=${id}`);
    };

    const basketClickFn = (id) => {
        BasketService.addProductToBasket(id, {showBasketWnd: true});
    };

    const getPageProducts = (page) => {
        const searchParams = {
            categoryId,
            brandId,
            searchValue
        }; 

        searchProducts(page, pageLimit, searchParams).then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    title: val.name,
                    text: val.description,
                    rating: val.rating,
                    price: val.price,
                    img: process.env.REACT_APP_IMAGES_FOLDER_URL + val.img
                };
            });
            setCards(array);

            let totalPages = Math.ceil(data.count/pageLimit);
            if(totalPages === 0) totalPages = 1;
            setTotalPages(totalPages); 
        });
    };

    const paginationClickFn = (pageNumber) => {
       // setPage(pageNumber);
       // getPageProducts(pageNumber);

       searchParams.set('page', pageNumber);
       navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    useEffect(() => {
        getPageProducts(currentPage);

        if(categoryId){
            fetchCategoryById(categoryId).then(data => {
                setSearchTitle(data.name);
            });
        }
    }, [searchParams]);

    return (
       <Container className='maincontainer' >
            <Row>
                <Col xs={3}> 
                    {/* <Sidebar sidebarArray={sidebarItemsArray}/> */}
                </Col>
                <Col  xs={9}>
                    <Container>
                        {
                            searchTitle ? 
                            <Row>
                                <h2 className='searchTitle'>{searchTitle}</h2>
                            </Row>
                            : null
                        }
                        <Row>
                            <ProductCards elements = {cardsArray} cardClickFn={openCardFn} basketClickFn={basketClickFn} > </ProductCards>
                        </Row>
                        {
                            numberOfPages > 1 ? 
                                <Row>
                                    <PaginationPanel 
                                        currentPage={currentPage} 
                                        numberOfPages={numberOfPages} 
                                        onClickFn={paginationClickFn}>
                                    </PaginationPanel>
                                </Row>
                                : null
                        }
                    </Container>
                </Col>
            </Row>
       </Container>
    )
}

export default ProductSearch;