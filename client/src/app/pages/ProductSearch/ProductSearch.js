import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import Row from 'react-bootstrap/Row';

import ProductCards from '../../components/ProductCards/ProductCards';
import PaginationPanel from '../../components/Paggination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';

import globalServices from '../../../services/globalServices';

import { searchProducts, fetchCategoryById } from '../../../services/http/API/ProductApi';

import './productSearch.css';

const ProductSearch = () => {
    const basketService = globalServices.getBasketServices();

    const pageLimit = 9;

    const [cardsArray, setCards] = useState([]);
    const [numberOfPages, setTotalPages] = useState(1);
    const [searchTitle, setSearchTitle] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const openCardFn = (id) => {
        navigate(`/product?id=${id}`);
    };

    const addToBasketClickFn = (id) => {
        basketService.addProductToBasket(id, {showBasketWnd: true});
    };

    const getPageProducts = (page, params) => {
        searchProducts(page, pageLimit, params).then(data => {
            const array = data.rows.map(val => {
                return {
                    id: val.id,
                    title: val.name,
                    text: val.description,
                    rating: val.rating,
                    price: val.price,
                    img: process.env.REACT_APP_IMAGES_PRODUCTS_FOLDER_URL + val.img
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
        const categoryId = searchParams.get('categoryId');
        const brandId = searchParams.get('brandId');
        const search = searchParams.get('search');

        getPageProducts(currentPage, {
            categoryId,
            brandId,
            search
        });

        if(categoryId){
            fetchCategoryById(categoryId).then(data => {
                setSearchTitle(data.name);
            });
        }else if(search){
            setSearchTitle(`Результаты поиска "${search}"`);
        }else{
            setSearchTitle('Поиск');
        }
    }, [searchParams]);

    return (
        <div className='main-container'>
            <div className='productSearch-title'>
                {
                    searchTitle ? 
                    <h2 className='searchTitle'>{searchTitle}</h2>
                    : null
                }
            </div>
            <div className='d-flex flex-row productSearch-container'>
                <div className='main-sidebar-container'>
                    <Sidebar>
                       
                    </Sidebar>
                </div>
                <div className='main-content-container'> 
                    
                    <ProductCards elements = {cardsArray} cardClickFn={openCardFn} basketClickFn={addToBasketClickFn} > </ProductCards>
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
                </div>
            </div>
        </div>
    )
}

export default ProductSearch;