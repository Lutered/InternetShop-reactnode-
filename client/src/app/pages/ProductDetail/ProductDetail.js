import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductTabs from "../../components/ProductTabs/ProductTabs";

import { fetchProductById } from '../../../services/http/API/ProductApi';

import './productDetail.css';

const ProductDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    let [product, setProduct] = useState({});

    useEffect(() => {
        fetchProductById(id).then(data => {
            if(data){
                data.imgURL = process.env.REACT_APP_IMAGES_PRODUCTS_FOLDER_URL + data.img;
                setProduct(data);
            }
                
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

/*
 <Row style={{marginTop: '10px'}}>
                <Col xs={5}> 
                    <img src={product.imgURL} style={{height: 'auto', width: '100%', maxWidth: '450px', margin: '10px'}}></img>
                </Col>
                <Col xs={5}> 
                    <div >
                        <div style={{margin: '10px'}}>
                            <div style={{fontWeight: 'bold'}}>{product.name}</div>
                        </div>
                        <Rating rating={product.rating} style={{margin: '10px'}} />
                        <div style={{margin: '10px'}}>
                            <b>Описание:</b><br/> {product.description}
                        </div>
                    </div>
                </Col>
            </Row>
*/