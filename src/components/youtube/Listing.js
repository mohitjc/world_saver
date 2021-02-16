import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Pagination from '../global/Pagination';
import ListItem from './LisItem';
import EmptyState from '../global/EmptyState';
import Loading from '../global/Loader';

const Listing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getId,
  resetSingle,
  deleteItem,
  items,
  sort,
  setSort,
  total,
  setPage,
  page,
  Archive,
  count,
  changeStatus,
  getStatus,
  toggleSort,
  isRequesting
}) => {
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    getSearchKeyword(keyword);
  }, [getSearchKeyword, keyword]);
  // console.log('total', total);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleFormVisibilty();
                  handAddFormToggle(true);
                  resetSingle();
                }}
                type="button"
              >
                Add Youtube
              </button>
            </h4>
            <div className="card-header-form">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={e => {
                      setKeyword(e.target.value);
                      setPage(1);
                    }}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {isRequesting ? (
            <Loading />
          ) : (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tr>
                    <th>#</th>
                    <th
                      onClick={() => toggleSort('name')}
                      style={{ cursor: 'pointer' }}
                    >
                      Title
                      <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                    </th>
                    
                    <th>Description</th>
                    <th>Link</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                  {items &&
                    items.map((item, index) => (
                      <ListItem
                        key={item.id}
                        item={item}
                        index={index}
                        handAddFormToggle={handAddFormToggle}
                        handleFormVisibilty={handleFormVisibilty}
                        getId={getId}
                        Archive={Archive}
                        deleteItem={deleteItem}
                        changeStatus={changeStatus}
                        getStatus={getStatus}
                        page={page}
                        count={count}
                      />
                    ))}
                </table>
                {isEmpty(items) && <EmptyState />}
              </div>
            </div>
          )}
          {items && !isEmpty(items) && (
            <Pagination total={total} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
