import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import {
  blogs,
  resetSingleBlog,
  deleteBlog,
  resetDeleteBlog
} from '../store/actions/blogsActions';
import { changeStatus, resetStatus } from '../store/actions/changeStatusActions';
import BlogsListing from '../components/blogs/BlogListing';
import BlogForm from '../components/blogs/BlogForm';

const Blogs = ({
  data,
  blogs,
  resetSingleBlog,
  deleteBlog,
  resetDeleteBlog,
  isDeleteSuccess,
  isChangeStatusSuccess,
  isChangeStatusError,
  isDeleteError,
  changeStatus,
  resetStatus,
  isSuccess
}) => {
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [type, setType] = useState('I');
  const [sort, setSort] = useState(false);
  const [sortType, setSortType] = useState('createdAt');
  const [reloadToggle, setReloadToggle] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [status, setStatus] = useState(null);
  // const [currentCount, setCurrentCount] = useState(count);

  useEffect(() => {
    blogs(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [blogs, reloadToggle, page, sort, searchKeyword, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Blog has been deleted!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteBlog();
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteBlog();
    }
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Blog has been activated'
          : 'Blog has been deactivated',
        {
          buttons: false,
          timer: 1500
        }
      );
      setReloadToggle(!reloadToggle);
      resetStatus();
    }

    if (isChangeStatusError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetStatus();
    }
  }, [isChangeStatusSuccess, isChangeStatusError]);

  const [formVisibility, setFormVisibilty] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [blogId, setBlogId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getBlogId = id => {
    setBlogId(id);
  };

  const getSearchKeyword = value => {
    setSearchKeyword(value);
  };

  const getStatus = value => {
    setStatus(value);
  };

  const toggleSort = value => {
    setSort(!sort);
    setSortType(value);
  };

  // console.log('isDeleteError', isDeleteError);
  return (
    <Layout title="Blogs">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Blogs" />
          {!formVisibility ? (
            <BlogsListing
              handleFormVisibilty={handleFormVisibilty}
              blogs={data && data.data && data.data.blog}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getBlogId={getBlogId}
              // UserListing={UserListing}
              resetSingleBlog={resetSingleBlog}
              deleteBlog={deleteBlog}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
              page={page}
              count={count}
              getSearchKeyword={getSearchKeyword}
              changeStatus={changeStatus}
              getStatus={getStatus}
              toggleSort={toggleSort}
            />
          ) : (
            <BlogForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              blogId={blogId}
              setReloadToggle={setReloadToggle}
              reloadToggle={reloadToggle}
            />
          )}
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.blogs.data,
  isRequesting: state.blogs.isRequesting,
  isSuccess: state.blogs.isSuccess,
  isError: state.blogs.isError,
  isDeleteSuccess: state.deleteBlog.isSuccess,
  isDeleteError: state.deleteBlog.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(
  mapStateToProps,
  {
    blogs,
    resetSingleBlog,
    deleteBlog,
    resetDeleteBlog,
    changeStatus,
    resetStatus
  }
)(Blogs);
