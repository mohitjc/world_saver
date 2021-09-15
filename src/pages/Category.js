import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import CategoryListing from '../components/categories/CategoryListing';
import CategoryForm from '../components/categories/CategoryForm';
import {
  categories,
  resetSingleCategory,
  deleteCategory,
  resetDeleteCategory
} from '../store/actions/categoryActions';
import { types } from '../store/actions/typeActions';

import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';
import Posts from '../components/Posts/Posts';

const Category = ({
  categories,
  data,
  resetSingleCategory,
  deleteCategory,
  resetDeleteCategory,
  isDeleteSuccess,
  isDeleteError,
  changeStatus,
  resetStatus,
  isChangeStatusSuccess,
  isChangeStatusError,
  isSuccess,
  isRequesting,
  allTypes,
  types
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
    categories(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [
    categories,
    reloadToggle,
    page,
    sort,
    searchKeyword,
    isDeleteSuccess,
    token,
    type,
    count,
    sortType
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Category has been deleted!', {
        buttons: false,
        timer: 1500
      });
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
    }
    resetDeleteCategory();
  }, [isDeleteSuccess, isDeleteError, resetDeleteCategory]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Category has been activated'
          : 'Category has been deactivated',
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
  }, [
    isChangeStatusSuccess,
    isChangeStatusError,
    status,
    reloadToggle,
    resetStatus
  ]);

  useEffect(() => {
    types(token);
  }, [token, types]);

  const [formVisibility, setFormVisibilty] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getCategoryId = id => {
    setCategoryId(id);
  };

  const getSearchKeyword = value => {
    setSearchKeyword(value);
  };

  const getStatus = value => {
    setStatus(value);
  };

  const toggleSort = value => {
    setSortType(value);
    setSort(!sort);
  };

  console.log('allTypes   s', allTypes);
  return (
    <Layout title="Categories">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Categories" />
          {!formVisibility ? (
            <>
              <CategoryListing
                handleFormVisibilty={handleFormVisibilty}
                categories={data && data.data && data.data.category}
                total={data && data.data && data.data.total}
                handAddFormToggle={handAddFormToggle}
                getCategoryId={getCategoryId}
                isRequesting={isRequesting}
                // UserListing={UserListing}
                resetSingleCategory={resetSingleCategory}
                deleteCategory={deleteCategory}
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
             
            </>
          ) : (
            <CategoryForm
              allTypes={allTypes}
              categories={data && data.data && data.data.category}
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              categoryId={categoryId}
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
  data: state.categories.data,
  isRequesting: state.categories.isRequesting,
  isSuccess: state.categories.isSuccess,
  isError: state.categories.isError,
  isDeleteSuccess: state.deleteCategory.isSuccess,
  isDeleteError: state.deleteCategory.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError,
  allTypes: state.types.data
});

export default connect(mapStateToProps, {
  categories,
  resetSingleCategory,
  deleteCategory,
  resetDeleteCategory,
  changeStatus,
  resetStatus,
  types
})(Category);
