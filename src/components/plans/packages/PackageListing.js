import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Pagination from '../../global/Pagination';
import EmptyState from '../../global/EmptyState';

import PackageListItem from './PackageListItem';

const PackageListing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getPackageId,
  resetSinglePackage,
  deletePackage,
  packages,
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
  }, [keyword]);
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
                  resetSinglePackage();
                }}
                type="button"
              >
                Add Package
              </button>
            </h4>
            <div className="card-header-form">
              {/* <form>
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
              </form> */}
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
                  <th>Type</th>
                  <th>Price</th>
                  <th>Valid day</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {packages &&
                  packages.map((item, index) => (
                    <PackageListItem
                      key={item.id}
                      item={item}
                      index={index}
                      handAddFormToggle={handAddFormToggle}
                      handleFormVisibilty={handleFormVisibilty}
                      getPackageId={getPackageId}
                      deletePackage={deletePackage}
                      changeStatus={changeStatus}
                      getStatus={getStatus}
                      page={page}
                      count={count}
                    />
                  ))}
              </table>
              {isEmpty(packages) && <EmptyState />}
            </div>
          </div>
          {!isEmpty(packages) && (
            <Pagination total={total} setPage={setPage} page={page} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageListing;
