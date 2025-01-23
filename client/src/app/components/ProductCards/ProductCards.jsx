import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartPlus, ChatDots } from 'react-bootstrap-icons';

import Rating from "../../additionalComponents/Rating";
import CurrencyIcons from "../../additionalComponents/CurrencyIcons";

import './productCards.css';

function ProductCards ({elements, cardClickFn, basketClickFn}) {
  const onAddProduct = (event, id) =>{
    event.stopPropagation();

    basketClickFn && basketClickFn(id);
  };

    return (
        <div>
            {elements.map((val, index) => 
              <Card className="productCard" key ={index} onClick={() => { cardClickFn && cardClickFn(val.id); }}>
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={val.imgUrl} />
                </div>

                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>

                  <div className='d-flex align-items-center'>
                    <Rating rating={val.rating} className='d-flex'></Rating>
                    <ChatDots size={16} className='ms-2'/>
                  </div>

                  <div className="price-container">
                    <p className="price">
                      {val.price}
                      <span style={{marginLeft: '2px'}}>
                        <CurrencyIcons size={20}/>
                      </span>
                    </p>
                    
                    <Button variant="outline-light" onClick={(e) => { onAddProduct(e, val.id); } }>
                      <CartPlus color="green" size={22}/>
                    </Button>
                  </div>    
                </Card.Body>

             </Card>
            )}
        </div>
      );
}

export default ProductCards;