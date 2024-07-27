import Card from 'react-bootstrap/Card';
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';

const cardStyle = { 
  width: '18rem', 
  float: 'left', 
  margin:'5px',
  padding: '5px',
  height: '600px' 
};

const containerStyle = {
  display:'inline'
};

function Cards ({elements}) {
    return (
        <div style={containerStyle}>
            {elements.map((val, index) => 
              <Card style={cardStyle} key ={index}>
                <div style={{height:'400px', position: 'relative'}}>
                  <Card.Img variant="top" src={val.Img} style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}/>
                </div>
                <Card.Body style={{height:'200px'}}>
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