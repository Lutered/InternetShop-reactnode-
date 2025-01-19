import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/esm/Button';

import Form from 'react-bootstrap/Form';

import Rating from '../../additionalComponents/Rating';
import CurrencyIcons from '../../additionalComponents/CurrencyIcons';

import globalServices from '../../../services/globalServices';

import './productTabs.css';

function ProductTabs({product}) {
    const characteristics = product.productCharacteristic ? JSON.parse(product.productCharacteristic) : [];
    const basketService = globalServices.getBasketServices();

    const addToBasketClickFn = (id) => {
        basketService.addProductToBasket(id, {updateCount: true});
    };

    return ( 
        <Tabs
            className="mb-3 productTabs"
        >
            <Tab eventKey="description" title="Описание">
                <Container className='m-0'>
                    <Row>
                        <Col xs={5}> 
                            <img src={product.imgURL} className='productTabs-productImage'></img>
                        </Col>
                        <Col xs={7}> 
                            <div >
                                <div className='productTabs-rating'>
                                    <Rating rating={product.rating} />
                                </div>
                                <div className='productTabs-description-container'>
                                    <b>Описание:</b>
                                    <br/> 
                                    <p className='productTabs-description'>{product.description}</p>
                                </div>
                                <div className='productTabs-salerprice-container'>
                                    <div className='productTabs-saler-container'>
                                            <span className='productTabs-saler-label'>Продавец:</span>
                                            <b className='productTabs-saler-name'>{product.saler?.name}</b>
                                    </div>
                                    <div className='productTabs-price-container'>
                                        <p className="productTabs-price">
                                            {product.price}
                                            <span style={{marginLeft: '2px'}}>
                                                <CurrencyIcons size={20}/>
                                            </span>
                                        </p>
                                        <div className='productTabs-price-buttons'>
                                            <Button variant="success" className='w-100' onClick={() => { addToBasketClickFn(product.id) }}>
                                                Купить
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="characteristics" title="Характеристики">
                <p className='productTabs-characterestics-title'>Характеристики <b>{product.name}</b></p>
                <dl className='productTabs-characterestics-list'>
                    {characteristics.map((val, index) => 
                        val.isTitle ? 
                        <dt className='d-flex productTabs-characterestics-listdtItem'>
                            <span className='productTabs-characterestics-dtlabel'>{val.Label}</span>
                        </dt>  
                        :
                        <dd className='d-flex'>
                          <div className='productTabs-characterestics-ddLabel d-flex'>
                            <span>{val.Label}</span>
                            <div className='productTabs-characterestics-ddSplitter'></div>
                          </div>
                          <span className='productTabs-characterestics-ddValue'>{val.Value}</span>
                      </dd>
                    )}
                    {/* <dd style={{display:'flex'}}>
                        <span style={{width: '100%', fontWeight: 'bold'}}>Тест</span>
                    </dd>
                    <dd style={{display:'flex'}}>
                        <span style={{width: '40%'}}>Серия</span>
                        <span style={{width: '60%'}}>Test</span>
                    </dd> */}
                </dl>
                {/* <div dangerouslySetInnerHTML={{ __html: testHtml}} /> */}

            </Tab>
            <Tab eventKey="comments" title="Коментарии">
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Ваш коментарий</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                            <div className='float-end mt-2'>
                                <Button variant="success">
                                    Отправить
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </Tab>
            <Tab eventKey="similar" title="Похожее">
                Tab content for Contact
            </Tab>
        </Tabs> 
    );
}

export default ProductTabs;