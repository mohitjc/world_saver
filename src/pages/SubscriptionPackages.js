import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
// import QuestionListing from '../components/questions/QuestionListing';
// import QuestionForm from '../components/questions/QuestionsForm';
import {
  packages,
  resetSinglePackage,
  deletePackage,
  resetDeletePackage
} from '../store/actions/subscribePackageActions';
import { changeStatus, resetStatus } from '../store/actions/changeStatusActions';
import PackageListing from '../components/plans/packages/PackageListing';
import PackageForm from '../components/plans/packages/PackageForm';

const SubscriptionPackages = ({
  data,
  packages,
  resetSinglePackage,
  deletePackage,
  resetDeletePackage,
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
    packages(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [packages, reloadToggle, page, sort, searchKeyword, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Package has been deleted!', {
        buttons: false,
        timer: 1500
      });
      resetDeletePackage();
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetDeletePackage();
    }
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Package has been activated'
          : 'Package has been deactivated',
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
  const [packageId, setPackageId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getPackageId = id => {
    setPackageId(id);
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

  // console.log(
  //   'datadatadatadata',
  //   data && data.data && data.data.subscribepackage
  // );
  return (
    <Layout title="Packages">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Packages" />
          {!formVisibility ? (
            <PackageListing
              handleFormVisibilty={handleFormVisibilty}
              packages={data && data.data && data.data.subscribepackage}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getPackageId={getPackageId}
              // UserListing={UserListing}
              resetSinglePackage={resetSinglePackage}
              deletePackage={deletePackage}
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
            <PackageForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              packageId={packageId}
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
  data: state.packages.data,
  isRequesting: state.packages.isRequesting,
  isSuccess: state.packages.isSuccess,
  isError: state.packages.isError,
  isDeleteSuccess: state.deletePackage.isSuccess,
  isDeleteError: state.deletePackage.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(
  mapStateToProps,
  {
    packages,
    resetSinglePackage,
    deletePackage,
    resetDeletePackage,
    changeStatus,
    resetStatus
  }
)(SubscriptionPackages);
