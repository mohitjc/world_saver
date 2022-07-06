import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Pagination from '../global/Pagination';
import BlogListItem from './ContentListItem';
import EmptyState from '../global/EmptyState';
import Loading from '../global/Loader';

const ContentListing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getBlogId,
  deleteBlog,
  data,
  sort,
  setSort,
  total,
  setPage,
  page,
  count,
  changeStatus,
  getStatus,
  toggleSort,
  isRequesting
}) => {
  const [keyword, setKeyword] = useState('');


  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>
              {/* <button
                className="btn btn-primary"
                onClick={() => {
                  handleFormVisibilty();
                  handAddFormToggle(true);
                }}
                type="button"
              >
                Add Content
              </button> */}
            </h4>
            <div className="card-header-form">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={e => {
                      getSearchKeyword(e.target.value);
                      setPage(1);
                    }}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary" type="button">
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
                      onClick={() => toggleSort('title')}
                      style={{ cursor: 'pointer' }}
                    >
                      Name
                      <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                    </th>
                    <th>Description</th>
                    <th>Slug</th>
                    {/* <th>Status</th> */}
                    <th>Action</th>
                  </tr>
                  {data &&
                    data.map((item, index) => (
                      <BlogListItem
                        key={item.id}
                        item={item}
                        index={index}
                        handAddFormToggle={handAddFormToggle}
                        handleFormVisibilty={handleFormVisibilty}
                        getBlogId={getBlogId}
                        deleteBlog={deleteBlog}
                        changeStatus={changeStatus}
                        getStatus={getStatus}
                        page={page}
                        count={count}
                      />
                    ))}
                </table>
                {isEmpty(data) && <EmptyState />}
              </div>
            </div>
          )}
          {!isEmpty(data) && (
            <Pagination total={total} setPage={setPage} page={page} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentListing;
