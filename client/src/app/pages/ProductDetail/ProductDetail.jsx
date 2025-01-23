import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductTabs from "../../components/ProductTabs/ProductTabs";

import globalServices from '../../../services/globalServices';

import './productDetail.css';

const ProductDetail = () => {
    const productService = globalServices.getProductService();

    const [searchParams, setSearchParams] = useSearchParams();

    let [product, setProduct] = useState({});

    const id = searchParams.get('id');

    useEffect(() => {
        productService.getProductById(id).then(product => {
            setProduct(product);
        });
    }, []);

    return ( 
        <div className='main-container'>
                <h2 className='productDetail-title'>{product.name}</h2>
               <ProductTabs product={product}/>
        </div> 
    );
}

export default ProductDetail;