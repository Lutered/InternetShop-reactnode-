import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate, useLocation, useParams  } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import ProductCards from '../../../components/ProductCards/ProductCards';
import PaginationPanel from '../../../components/Paggination/Pagination';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ProductFilter from '../../../components/ProductFilter/ProductFilter';

import { SEARCH_ROUTE, PRODUCT_DETAIL_ROUTE } from '../../../router/routeConsts';

import globalServices from '../../../../services/globalServices';

import './productSearch.css';

const ProductSearch = () => {
    //#region variables
    const basketService = globalServices.getBasketService();
    const productService = globalServices.getProductService();
    const modalService = globalServices.getModalService();

    const [searchTitle, setSearchTitle] = useState();
    const [cardsArray, setCards] = useState([]);

    const [numberOfPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
 
    const [filterItems, setFilterItems] = useState([]);

    const pathParams = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const pageLimit = 9;
    const productType = pathParams.productType;
    const searchValue = searchParams.get('text');

    let filters = {};
    if(productType){
        searchParams.forEach((value, key) => {
            filters[key] = value;
        });
    }

    const titleHeight = '80px';
    const containerHeight = `calc(100dvh - var(--nav-height) - ${titleHeight})`;
    //#endregion

    //#region functions
    const filterProducts = (filtersStr) => {
        navigate(`${SEARCH_ROUTE}/${productType}?${filtersStr}`);
    };

    const openCardFn = (id) => {
        navigate(`${PRODUCT_DETAIL_ROUTE}/${id}`);   
    };

    const addToBasketClickFn = (id) => {
        basketService.addProductToBasket(id).then(() => {
            modalService.show('basket');
        });
    };

    const updateCardsFn = () => {
        setCards([]);
        productService.searchProducts(currentPage, pageLimit, {
            productType,
            reqParams: productType ? filters : {searchValue}
        }).then(products => {
            setCards(products);

            let totalPages = Math.ceil(products.count/pageLimit);
            if(totalPages === 0) totalPages = 1;
            setTotalPages(totalPages); 

            if(currentPage > totalPages) setCurrentPage(totalPages);
        });
    };

    const paginationClickFn = (pageNumber) => {
        setCurrentPage(pageNumber);
        updateCardsFn();
    };
    //#endregion

    useEffect(() => {
        setFilterItems([]);

        if(productType){
            productService.getProductType(productType).then(data => {
                if(!data) return;

                setSearchTitle(data.name);
                setFilterItems(data.filters);
            });
        }else if(searchValue)
            setSearchTitle(`Результаты поиска "${searchValue}"`);
        else
            setSearchTitle('Поиск');

        updateCardsFn();
    }, [searchParams, productType, searchValue]);

    return (
        <div className='main-container d-flex flex-column'>
            <div className='productSearch-title' style={{
                height: titleHeight
            }}>
                {
                    searchTitle ? 
                    <h2 className='searchTitle'>{searchTitle}</h2>
                    : null
                }
            </div>
            <div className='productSearch-container container-sidebar' style={{
                height: containerHeight,
                maxHeight: containerHeight
            }}>
                {filterItems.length !== 0 ? 
                    <div className='main-sidebar-container'>
                        <Sidebar style={{height: '100%'}}>
                            <ProductFilter 
                                itemsConfig={filterItems} 
                                filters={filters}
                                onFilter={filterProducts}
                                />
                        </Sidebar>
                    </div> : null
                }
                <div className='main-content-container d-flex flex-column ali' style={{
                    heigth: '100%',
                    maxHeight: '100%',
                    overflowY: 'auto'
                }}> 
                    
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