import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Rating from "../../additionalComponents/Rating";

import { fetchProductById } from '../../../services/http/API/ProductApi';

const ProductDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    let [product, setProduct] = useState({});

    useEffect(() => {
        fetchProductById(id).then(data => {
            if(data){
                data.imgURL = process.env.REACT_APP_IMAGES_FOLDER_URL + data.img;
                setProduct(data);
            }
                
        });
    }, []);

    return ( 
        <Container className='maincontainer'>
            <Row>
                <Tabs
                    className="mb-3"
                    style = {{margin: '10px'}}
                    justify
                >
                    <Tab eventKey="description" title="Описание">
                        <Container>
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
                        </Container>
                    </Tab>
                    <Tab eventKey="characteristics" title="Характеристики">
                        Характеристики
                    </Tab>
                    <Tab eventKey="comments" title="Коментарии">
                        Комментарии
                    </Tab>
                    <Tab eventKey="similar" title="Похожее">
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </Row>
        </Container> 
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