import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Pagination from '../global/Pagination';
import EmptyState from '../global/EmptyState';
import TypeListItem from './TypeListItem';

const TypeListing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getQuestionId,
  resetSingleQuestion,
  deleteQuestion,
  questions,
  sort,
  setSort,
  total,
  setPage,
  page,
  count,
  changeStatus,
  getStatus,
  toggleSort
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
                  resetSingleQuestion();
                }}
                type="button"
              >
                Add Type
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
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped">
                <tr>
                  <th>#</th>
                  <th
                    onClick={() => toggleSort('question')}
                    style={{ cursor: 'pointer' }}
                  >
                    Name
                    <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                  </th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {questions &&
                  questions.map((item, index) => (
                    <TypeListItem
                      key={item.id}
                      item={item}
                      index={index}
                      handAddFormToggle={handAddFormToggle}
                      handleFormVisibilty={handleFormVisibilty}
                      getQuestionId={getQuestionId}
                      deleteQuestion={deleteQuestion}
                      changeStatus={changeStatus}
                      getStatus={getStatus}
                      page={page}
                      count={count}
                    />
                  ))}
              </table>
              {isEmpty(questions) && <EmptyState />}
            </div>
          </div>
          {!isEmpty(questions) && (
            <Pagination total={total} setPage={setPage} page={page} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeListing;
