import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

const BottomPagination = ({ total, setPage, page }) => {
  const [activePage, setActivePage] = useState(1);
  const handlePageChange = pageNumber => {
    // console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    setPage(pageNumber);
  };
  // console.log('activePage', activePage);
  return (
    <div>
      <Pagination
        activePage={page}
        activeClass="active"
        itemsCountPerPage={10}
        totalItemsCount={total}
        pageRangeDisplayed={10}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default BottomPagination;
