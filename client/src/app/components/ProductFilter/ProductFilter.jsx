import Form from 'react-bootstrap/Form';
import { ChevronUp } from 'react-bootstrap-icons';

import './productFilter.css';
import { useState } from 'react';

const ExpandedGroup = ({children, id, label, isExpandedDefault, registerMap}) => {
    const expandIconSize = 16;
    const defaulLabelColor = '#3e3d3d'; 
    const hoverLabelColor = '#1a0fdb';

    const [isExpanded, setExpanded] = useState(isExpandedDefault);
    const [labelColor, setLabelColor] = useState(defaulLabelColor);

    if(registerMap) registerMap.set(id, [isExpanded, setExpanded]);

    const expandElementClassName = 'filter-expand-element ' + 
        (isExpanded ? 'filter-expand-expanded' : 'filter-expand-collapsed');

    const iconContainerClassName = 'filter-expand-icon-container ' + 
        (isExpanded ? 'filter-expand-icon-container-expanded' : '');

    return (
        <div className='filter-expand-group'>
            <div 
                className='filter-expand-label'
                onClick={() => setExpanded(!isExpanded)}
                onMouseEnter={() => {setLabelColor(hoverLabelColor)}}
                onMouseOut={() => {setLabelColor(defaulLabelColor)}}
                style={{color: labelColor}}
            >
                    <span>{label}</span>
                    <div className={iconContainerClassName}>
                            <ChevronUp 
                                size={expandIconSize} 
                                color={labelColor} 
                            />
                    </div>
            </div>
            <div className='filter-expand-wrapper'>
                <div className={expandElementClassName}>
                    <div className='filter-expand-child-container'>
                    {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProductFilter(){
    const registerMap = new Map();

    return(
        <div className='filter-container'>
            <ExpandedGroup 
                label='Бренд' 
                id='brand'
                isExpandedDefault={false} 
                registerMap={registerMap}
            >
                <div>
                    <Form.Check 
                            type='checkbox'
                            label='Test'
                    />
                    <Form.Check 
                        type='checkbox'
                        label='Test2'
                    />
                </div>
            </ExpandedGroup>
            <ExpandedGroup 
                label='Цена' 
                id='price'
                isExpandedDefault={false} 
                registerMap={registerMap}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Form.Control
                        type='number'
                    />
                    <span style={{margin: '0 5px'}}>-</span>
                    <Form.Control
                        type='number'
                    />
                </div>
            </ExpandedGroup>
        </div>
    );
}