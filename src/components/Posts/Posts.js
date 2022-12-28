import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
// import UserListItem from '../UserListItem';
import Pagination from '../global/Pagination';
import EmptyState from '../global/EmptyState';
import Loading from '../global/Loader';
import PostItems from './PostItems';

const Posts = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getUserId,
  resetSingleUser,
  changeStatus,
  deleteUser,
  deletePost,
  users,
  sort,
  posts,
  setSort,
  total,
  setPage,
  getStatus,
  toggleSort,
  page,
  count,
  isRequesting
}) => {
  const [keyword, setKeyword] = useState('');
//   useEffect(() => {
//     getSearchKeyword(keyword);
//   }, [getSearchKeyword, keyword]);
console.log('users', total);


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
                  // resetSingleCategory();
                }}
                type="button"
              >
                Add User
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
                      onClick={() => toggleSort('fullName')}
                      style={{ cursor: 'pointer' }}
                    >
                      User_post{' '}
                      
                    </th>
                    <th>Action</th>
                  </tr>
                  {users &&
                    users.map((item, index) => (
                        console.log(index, 'itms'),
                      <PostItems
                        key={item.id}
                        item={item}
                        index={index}
                        handAddFormToggle={handAddFormToggle}
                        handleFormVisibilty={handleFormVisibilty}
                        getUserId={getUserId}
                        deleteUser={deleteUser}
                        deletePost={deletePost}
                        changeStatus={changeStatus}
                        getStatus={getStatus}
                        page={page}
                        posts={posts}
                        count={count}
                      />
                    ))}
                </table>
                {users && isEmpty(users) && <EmptyState />}
              </div>
            </div>
          )}
          {users && !isEmpty(users) && (
            <Pagination total={total} setPage={setPage} page={page} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
