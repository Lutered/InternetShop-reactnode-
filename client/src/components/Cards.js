import Card from 'react-bootstrap/Card';
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';

const cardStyle = { 
  width: '18rem', 
  float: 'left', 
  margin:'5px' 
};

const containerStyle = {
  display:'inline'
};

function Cards ({elements}) {
    return (
        <div style={containerStyle}>
            {elements.map((val, index) => 
              <Card style={cardStyle} key ={index}>
                <Card.Img variant="top" src={val.Img} />
                <Card.Body>
                  <Card.Title>{val.Title}</Card.Title>
                  <Card.Text> {val.Text} </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
             </Card>
            )}
        </div>
      );
}

export default Cards;