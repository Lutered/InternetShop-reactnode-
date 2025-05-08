import React from 'react';
import Card from 'react-bootstrap/Card';

import './categoryCards.css';

const CategoryCards = ({elements, clickFn}) => {
    return ( 
        <div>
            {elements.map((rec, index) => 
              <Card className='categoryCard' key ={index} onClick={() => { clickFn && clickFn(rec); }}>
                <div className='card-img-wrapper'>
                  <Card.Img variant="top" src={rec.imgUrl ?? ''}/>
                </div>
                <Card.Body>
                  <Card.Title>{rec.name}</Card.Title>
                  <Card.Text> {rec.text} </Card.Text>
                </Card.Body>
             </Card>
            )}
        </div> 
    );
}

export default CategoryCards;