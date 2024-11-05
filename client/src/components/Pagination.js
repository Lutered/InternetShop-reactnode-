import React, {useContext} from 'react';
import Pagination from 'react-bootstrap/Pagination';

const getPaginationItems = (fromPage, toPage, breakpoint, onClickFn) => {
    let pageNumber = fromPage;
    let lastNumber = null;
    let items = [];

    if(toPage < 1) toPage = 1;

    if(fromPage === toPage){
        items.push(
            <Pagination.Item key={pageNumber} active={false} onClick={() => {if(onClickFn) onClickFn(pageNumber)}}>
              {pageNumber}
            </Pagination.Item>,
          );
        return items;
    }

    const increasePages = (toPage - fromPage) > 0;
    
    for(let i = 0; i <= Math.abs(toPage - fromPage); i++){
        items.push(
            <Pagination.Item key={pageNumber} active={false} onClick={() => {if(onClickFn) onClickFn(pageNumber)}}>
              {pageNumber}
            </Pagination.Item>,
          );

        lastNumber = pageNumber;
        if(pageNumber === breakpoint) break;
        
        increasePages ? pageNumber++ : pageNumber--;
    }

    if(!lastNumber) return items;

    const isElipsis = increasePages ? 
                    lastNumber < breakpoint - 1 :  
                    lastNumber > breakpoint + 1;

    if(isElipsis){
        items.push(
            <Pagination.Ellipsis />
          );
    }

    const isBreakpoint = increasePages ?
                        lastNumber < breakpoint : 
                        lastNumber > breakpoint;

    if(isBreakpoint){
        items.push(
            <Pagination.Item key={1} active={false} onClick={() => {if(onClickFn) onClickFn(breakpoint)}}>
              {breakpoint}
            </Pagination.Item>,
          );
    }
    
    return items;
};

const PaginationPanel = ({currentPage, numberOfPages, onClickFn}) => {
    const numberIndent = 2;
    let items = [];

    items.push(
        <Pagination.Item key={currentPage} active={true} activeLabel={''}>
          {currentPage}
        </Pagination.Item>,
      );

    if(currentPage > 1){
        let previtemsArray = getPaginationItems(currentPage - 1, currentPage - numberIndent, 1, onClickFn);
        items.push(...previtemsArray);
        items.reverse();
    }
        
    if(currentPage < numberOfPages)
        items.push(getPaginationItems(currentPage + 1, currentPage + numberIndent, numberOfPages, onClickFn));

    return ( 
        <Pagination style={{margin: 'auto'}}>
            {items}
        </Pagination> 
    );
}

export default PaginationPanel;