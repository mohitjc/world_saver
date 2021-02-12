import React, { useState, useEffect } from 'react';
import Loading from '../global/Loader';
import { isEmpty } from 'lodash';
import EmptyState from '../global/EmptyState';
import {
    youtube,
    resetSingleUser,
    deleteUser,
    resetDeleteUser
  } from '../../store/actions/youtubeActions';
import YoutTubeListingItem from './youtubeListingItem';
import Pagination from 'react-js-pagination';

const YouTubeListing = ({handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getUserId,
  resetSingleUser,
  changeStatus,
  deleteUser,
  youtube,
  sort,
  setSort,
  total,
  setPage,
  getStatus,
  toggleSort,
  page,
  count,
  isRequesting}) =>{

  let data = [
    {title:"Title 1", description:"dsddsfsdf", link:"dfd"},
    {title:"Title 1", description:"dsddsfsdf", link:"dfd"},
    {title:"Title 1", description:"dsddsfsdf", link:"dfd"}
  ]

  const [list , setList] = useState(youtube|| '');
  console.log("youtube", youtube);
 

    return (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      handleFormVisibilty();
                      handAddFormToggle(true);
                      // resetSingleCategory();
                    }}
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
                <Loading/>
              ) : (
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <tr>
                        <th>#</th>
                        <th
                          onClick={() => toggleSort('fullName')}
                          style={{ cursor: 'pointer' }}
                        >
                          Title{' '}
                          <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                        </th>
                        <th
                          onClick={() => toggleSort('username')}
                          style={{ cursor: 'pointer' }}
                        >
                          Description{' '}
                          <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                        </th>
                        <th>Youtube Link</th>
                      </tr>
                      {list &&
                        list.map((item, index) => (
                          <YoutTubeListingItem item={item} index={index} page={page} count={count} handleFormVisibilty={handleFormVisibilty} getUserId={getUserId} handAddFormToggle={handAddFormToggle} />
                        ))}
                    </table>
                    {list && isEmpty(list) && <EmptyState />}
                  </div>
                </div>
              )}
              {list && !isEmpty(list) && (
                <Pagination total={total} setPage={setPage} page={page} />
              )}
            </div>
          </div>
        </div>
      );
}

export default YouTubeListing; 