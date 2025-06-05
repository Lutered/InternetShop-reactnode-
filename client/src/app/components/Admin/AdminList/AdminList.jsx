import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Trash, PencilFill } from 'react-bootstrap-icons';

const AdminTypes = ({items}) => {
    return ( 
        <div style={{marginTop: '10px', marginBottom:'10px', maxWidth: '1000px', margin: 'auto'}}>
            <Button variant="success" style={{float: 'right', marginBottom: '10px'}} >Добавить тип</Button>
            <ListGroup style={{width: '100%'}}>
                {items.map((val, index) => 
                    <ListGroup.Item key = {index} className="d-flex justify-content-between align-items-start">
                        <div style={{height: '100%', fontSize:'18px'}}>
                            {/* {
                                val.iconUrl ? 
                                    <img src={val.iconUrl} className='iconGroup-icon' alt="icon" /> 
                                    : null
                            } */}
                            {val.name}
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

export default AdminTypes;