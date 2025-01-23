import ListGroup from 'react-bootstrap/ListGroup';

import './iconGroup.css';

const IconGroup = ({sidebarArray, clickFn}) => {
    return (
        <ListGroup className='iconGroup'>
            {sidebarArray.map((val, index) => 
                <ListGroup.Item key={index} 
                                className="iconGroup-item" 
                                onClick={() => { clickFn && clickFn(val.id)}}>

                    <div className='iconGroup-iconWrapper'>
                        {
                            val.iconUrl ? 
                                <img src={val.iconUrl} className='iconGroup-icon' alt="icon" /> 
                                : null
                        }
                    </div>
                    <div>{val.name}</div>
                </ListGroup.Item>              
            )}
        </ListGroup>
    );
}

export default IconGroup;
