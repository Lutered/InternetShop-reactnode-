import React from 'react';
import Card from 'react-bootstrap/Card';

import './categoryCards.css';

const CategoryCards = ({elements, clickFn}) => {
    return ( 
        <div>
            {elements.map((val, index) => 
              <Card className='categoryCard' key ={index} onClick={() => { clickFn && clickFn(val.id); }}>
                <div className='card-img-wrapper'>
                  <Card.Img variant="top" src={val.imgUrl ?? ''}/>
                </div>
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                  <Card.Text> {val.text} </Card.Text>
                </Card.Body>
             </Card>
            )}
        </div> 
    );
}

export default CategoryCards;