import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate, useLocation, useParams  } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import ProductCards from '../../components/ProductCards/ProductCards';
import PaginationPanel from '../../components/Paggination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductFilter from '../../components/ProductFilter/ProductFilter';

import { PRODUCT_DETAIL_ROUTE } from '../../router/routeConsts';

import globalServices from '../../../services/globalServices';

import './productSearch.css';

const ProductSearch = () => {
    //#region variables
    const basketService = globalServices.getBasketService();
    const productService = globalServices.getProductService();
    const modalService = globalServices.getModalService();

    const [cardsArray, setCards] = useState([]);
    const [numberOfPages, setTotalPages] = useState(1);
    const [searchTitle, setSearchTitle] = useState();
    const [searchFilter, setFilter] = useState({});

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const pathParams = useParams()

    const pageLimit = 9;
    const productType = pathParams.productType;
    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    //#endregion

    //#region functions
    const openCardFn = (id) => {
        navigate(`${PRODUCT_DETAIL_ROUTE}?id=${id}`);
    };

    const addToBasketClickFn = (id) => {
        basketService.addProductToBasket(id).then(() => {
            modalService.show('basket');
        });
    };

    const getPageProducts = (page, params) => {
        productService.searchProducts(page, pageLimit, params).then(products => {
            setCards(products);

            let totalPages = Math.ceil(products.count/pageLimit);
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
    //#endregion

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
            productService.getCategoryByIdAsync(categoryId).then(category => {
                setSearchTitle(category.name);
            });
        }else if(search){
            setSearchTitle(`Результаты поиска "${search}"`);
        }else{
            setSearchTitle('Поиск');
        }
    }, [searchParams]);

    return (
        <div className='main-container d-flex flex-column'>
            <div className='productSearch-title'>
                {
                    searchTitle ? 
                    <h2 className='searchTitle'>{searchTitle}</h2>
                    : null
                }
            </div>
            <div className='productSearch-container container-sidebar'>
                {searchFilter ? 
                    <div className='main-sidebar-container'>
                        <Sidebar>
                            <ProductFilter />
                        </Sidebar>
                    </div> : null
                }
                <div className='main-content-container d-flex flex-column ali'> 
                    
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