import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import Listing from '../components/advertisement/Listing';
import Form from '../components/advertisement/Form';
import {
  items,
  resetSingle,
  Delete,
  resetDelete
} from '../store/actions/advertiseActions';
import { types } from '../store/actions/typeActions';

import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';

const Advertise = ({
  items,
  data,
  resetSingle,
  Delete,
  resetDelete,
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
    token,
    type,
    count,
    sortType
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Advertise has been deleted!', {
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
    resetDelete();
  }, [isDeleteSuccess, isDeleteError, resetDelete]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Advertise has been activated'
          : 'Advertise has been deactivated',
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
    <Layout title="Advertise">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Advertise" />
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
  data: state.advertises.data,
  isRequesting: state.advertises.isRequesting,
  isSuccess: state.advertises.isSuccess,
  isError: state.advertises.isError,
  isDeleteSuccess: state.deleteAdvertise.isSuccess,
  isDeleteError: state.deleteAdvertise.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError,
  allTypes: state.types.data
});

export default connect(mapStateToProps, {
  items,
  resetSingle,
  Delete,
  resetDelete,
  changeStatus,
  resetStatus,
  types
})(Advertise);
