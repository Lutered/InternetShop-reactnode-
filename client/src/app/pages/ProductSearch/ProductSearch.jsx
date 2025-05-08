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
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTitle, setSearchTitle] = useState();
    const [filterConfig, setFilterConfig] = useState([]);

    const pathParams = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const pageLimit = 9;
    const productType = pathParams.productType;
    const searchValue = searchParams.get('text');
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

    const updateCardsFn = () => {
        let reqParams = {};

        searchParams.forEach((value, key) => {
            switch(key){
                case 'text':
                    reqParams.searchValue = value;
                    break;
                default:
                    reqParams[key] = value;
                    break;
            }
        });

        productService.searchProducts2(currentPage, pageLimit, {
            productType,
            reqParams
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
        if(productType){

        }else if(searchValue)
            setSearchTitle(`Результаты поиска "${searchValue}"`);
        else
            setSearchTitle('Поиск');

        updateCardsFn();
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
                {filterConfig.length !== 0 ? 
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