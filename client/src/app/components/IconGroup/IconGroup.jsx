import ListGroup from 'react-bootstrap/ListGroup';

import './iconGroup.css';

const IconGroup = ({sidebarArray, clickFn}) => {
    return (
        <ListGroup className='iconGroup'>
            {sidebarArray.map((rec, index) => 
                <div key={index} 
                                className="iconGroup-item" 
                                onClick={() => { clickFn && clickFn(rec)}}>

                    <div className='iconGroup-iconWrapper'>
                        {
                            rec.iconUrl ? 
                                <img src={rec.iconUrl} className='iconGroup-icon' alt="icon" /> 
                                : null
                        }
                    </div>
                    <div>{rec.name}</div>
                </div>              
            )}
        </ListGroup>
    );
}

export default IconGroup;
