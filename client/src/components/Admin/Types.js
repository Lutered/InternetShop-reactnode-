import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Trash, PencilFill, Plus } from 'react-bootstrap-icons';

function Types() {
    const types = [
        {id: 1, Name: 'Type 1'},
        {id: 2, Name: 'Type 2'}
    ];
    return ( 
        <div style={{marginTop: '10px', marginBottom:'10px', maxWidth: '1000px', margin: 'auto'}}>
            <Button variant="success" style={{float: 'right', marginBottom: '10px'}} >Добавить тип</Button>
            <ListGroup style={{width: '100%'}}>
                {types.map((val, index) => 
                    <ListGroup.Item key = {val.id} className="d-flex justify-content-between align-items-start">
                        <div style={{height: '100%', fontSize:'18px'}}>
                            {val.Name}
                        </div>
                        <div>
                            <Button variant="outline-primary" style={{border: 'none'}}> <PencilFill /></Button>
                            <Button variant="outline-danger" style={{border: 'none'}}> <Trash /></Button>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>   
        </div> 
    );
}

export default Types;