import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import TypeListing from '../components/plans/types/TypeListing';
import TypeForm from '../components/plans/types/TypeForm';
import {
  types,
  resetSingleType,
  deleteType,
  resetDeleteType
} from '../store/actions/planTypeActions';
import { changeStatus, resetStatus } from '../store/actions/changeStatusActions';

const SubscriptionTypes = ({
  data,
  types,
  resetSingleType,
  deleteType,
  resetDeleteType,
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
    types(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [types, reloadToggle, page, sort, searchKeyword, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Type has been deleted!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteType();
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteType();
    }
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Type has been activated'
          : 'Type has been deactivated',
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
  const [typeId, setTypeId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getTypeId = id => {
    setTypeId(id);
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

  // console.log('isDeleteErrordatadata', data);
  return (
    <Layout title="Types">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Types" />
          {!formVisibility ? (
            <TypeListing
              handleFormVisibilty={handleFormVisibilty}
              types={data && data.data && data.data.category}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getTypeId={getTypeId}
              // UserListing={UserListing}
              resetSingleType={resetSingleType}
              deleteType={deleteType}
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
            <TypeForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              typeId={typeId}
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
  data: state.types.data,
  isRequesting: state.types.isRequesting,
  isSuccess: state.types.isSuccess,
  isError: state.types.isError,
  isDeleteSuccess: state.deleteType.isSuccess,
  isDeleteError: state.deleteType.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(
  mapStateToProps,
  {
    types,
    resetSingleType,
    deleteType,
    resetDeleteType,
    changeStatus,
    resetStatus
  }
)(SubscriptionTypes);
