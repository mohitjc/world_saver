import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import Listing from '../components/youtube/Listing';
import Form from '../components/youtube/Form';
import {
  items,
  resetSingle,
  Delete,
  resetDelete,
  Archive
} from '../store/actions/youtubeActions';
import { types } from '../store/actions/typeActions';

import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';

const Youtube = ({
  items,
  data,
  resetSingle,
  Delete,
  Archive,
  resetDelete,
  isDeleteSuccess,
  isArchiveSuccess,
  isDeleteError,
  isArchiveError,
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
    items(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [
    items,
    reloadToggle,
    page,
    sort,
    searchKeyword,
    isDeleteSuccess,
    isArchiveSuccess,
    token,
    type,
    count,
    sortType
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Youtube has been deleted!', {
        buttons: false,
        timer: 1500
      });
    }

    if (isArchiveSuccess) {
      swal('Youtube has been archived!', {
        buttons: false,
        timer: 1500
      });
    }

    if (isDeleteError || isArchiveError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
    }

    resetDelete();
  }, [isDeleteSuccess,isArchiveSuccess, isDeleteError, isArchiveError, resetDelete]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Youtube has been activated'
          : 'Youtube has been deactivated',
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
  const [Id, setId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getId = id => {
    setId(id);
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
    <Layout title="Youtube">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Youtube" />
          {!formVisibility ? (
            <Listing
              handleFormVisibilty={handleFormVisibilty}
              items={data && data.data}
              total={data && data.total}
              handAddFormToggle={handAddFormToggle}
              getId={getId}
              isRequesting={isRequesting}
              // UserListing={UserListing}
              resetSingle={resetSingle}
              deleteItem={Delete}
              Archive={Archive}
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
            <Form
              allTypes={allTypes}
              items={data && data.data && data.data.category}
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              Id={Id}
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
  data: state.youtubes.data,
  isRequesting: state.youtubes.isRequesting,
  isSuccess: state.youtubes.isSuccess,
  isError: state.youtubes.isError,
  isDeleteSuccess: state.deleteYoutube.isSuccess,
  isDeleteError: state.deleteYoutube.isError,
  isArchiveSuccess: state.youtubeArchive.isSuccess,
  isArchiveError: state.youtubeArchive?.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError,
  allTypes: state.types.data
});

export default connect(mapStateToProps, {
  items,
  resetSingle,
  Delete,
  Archive,
  resetDelete,
  changeStatus,
  resetStatus,
  types
})(Youtube);
