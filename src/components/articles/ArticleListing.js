import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Pagination from '../global/Pagination';
import BlogListItem from './ArticleListItem';
import EmptyState from '../global/EmptyState';
import Loading from '../global/Loader';

const ArticleListing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getBlogId,
  resetSingleBlog,
  deleteBlog,
  blogs,
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
                  resetSingleBlog();
                }}
                type="button"
              >
                Add Article
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
                    {/* <th>Created At</th> */}
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  {blogs &&
                    blogs.map((item, index) => (
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
                {isEmpty(blogs) && <EmptyState />}
              </div>
            </div>
          )}
          {!isEmpty(blogs) && (
            <Pagination total={total} setPage={setPage} page={page} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleListing;
