import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import RolesAndPermissionsListing from '../components/rolesAndPermissions/RolesAndPermissionsListing';
import {
  names,
  resetSingleName,
  deleteName,
  resetDeleteName
} from '../store/actions/planNameActions';
import { changeStatus, resetStatus } from '../store/actions/changeStatusActions';
import RolesAndPermissionsForm from '../components/rolesAndPermissions/RolesAndPermissionsForm';

const RolesAndPermissions = ({
  data,
  names,
  resetSingleName,
  deleteName,
  resetDeleteName,
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
    names(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [names, reloadToggle, page, sort, searchKeyword, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Name has been deleted!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteName();
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteName();
    }
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Name has been activated'
          : 'Name has been deactivated',
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
  const [nameId, setNameId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getNameId = id => {
    setNameId(id);
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
    <Layout title="Roles And Permissions">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Roles And Permissions" />
          {/* {!formVisibility ? (
            <RolesAndPermissionsListing
              handleFormVisibilty={handleFormVisibilty}
              names={data && data.data && data.data.subscribenames}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getNameId={getNameId}
              // UserListing={UserListing}
              resetSingleName={resetSingleName}
              deleteName={deleteName}
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
          ) : null} */}
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.names.data,
  isRequesting: state.names.isRequesting,
  isSuccess: state.names.isSuccess,
  isError: state.names.isError,
  isDeleteSuccess: state.deleteName.isSuccess,
  isDeleteError: state.deleteName.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(
  mapStateToProps,
  {
    names,
    resetSingleName,
    deleteName,
    resetDeleteName,
    changeStatus,
    resetStatus
  }
)(RolesAndPermissions);
