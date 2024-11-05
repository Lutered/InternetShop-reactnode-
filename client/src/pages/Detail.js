import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProductById } from '../http/productApi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

const starsArray = [];

for(let i = 1; i <= 5; i++){
    starsArray.push(i);
}

const Detail = () => {
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
        <Container>
            <Row style={{marginTop: '10px'}}>
                {/* <Col xs={1}>  </Col> */}
                <Col xs={5}> 
                    <div style={{margin: '10px', height: '500px', width: '100%'}}> 
                        <img src={product.imgURL} style={{height: 'auto', width: '100%'}}></img>
                    </div>
                </Col>
                <Col xs={5}> 
                    <div >
                        <div style={{margin: '10px'}}>
                            <div style={{fontWeight: 'bold'}}>{product.name}</div>
                        </div>
                        <div style={{margin: '10px'}}>
                            {starsArray.map(i => {
                                if(product.rating >= i) return <StarFill key={i}></StarFill>;
                                if((product.rating - 0.5) >= i) return <StarHalf key={i}></StarHalf>;

                                return <Star key={i}></Star>;
                            })}
                        </div>
                        <div style={{margin: '10px'}}>
                            <b>Описание:</b><br/> {product.description}
                        </div>
                    </div>
                </Col>
                {/* <Col xs={1}>  </Col> */}
            </Row>
        </Container> 
    );
}

export default Detail;