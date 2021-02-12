import React, { useState, useEffect } from 'react';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import YouTubeForm from '../components/youtube/youtubeForm';
import YouTubeListing from '../components/youtube/youtubeListing';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import { isNull } from 'lodash';
import UserListing from '../components/user/UserListing';
import UserForm from '../components/user/UserForm';

import {
  youtube,
  resetSingleUser,
  deleteUser,
  resetDeleteUser
} from '../store/actions/youtubeActions';

import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';

const YouTubeManagement = ({youtube,
    data,
    resetSingleUser,
    deleteUser,
    resetDeleteUser,
    isDeleteSuccess,
    isDeleteError,
    isChangeStatusSuccess,
    isChangeStatusError,
    changeStatus,
    resetStatus,
    isSuccess,
    location,
    isRequesting}) =>{

    const [roles, setRoles] = useState(location.state && location.state.role);
    const [formVisibility, setFormVisibilty] = useState(false);
    const [isAddForm, setIsAddForm] = useState(false);
    const [userId, setUserId] = useState(null);
    const [reloadToggle, setReloadToggle] = useState(false);

    const token = localStorage.getItem('token');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [type, setType] = useState('');
    const [sortType, setSortType] = useState('createdAt');
    const [sort, setSort] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [status, setStatus] = useState(null);
    // const [currentCount, setCurrentCount] = useState(count);



    useEffect(() => {
        if (isNull(location.state && location.state.role)) {
          youtube(
            token,
            type,
            page,
            count,
            sortType,
            '',
            sort ? 'asc' : 'desc',
            searchKeyword
          );
        } else {
          youtube(
            token,
            type,
            page,
            count,
            sortType,
            roles,
            sort ? 'asc' : 'desc',
            searchKeyword
          );
        }
      }, [
        youtube,
        reloadToggle,
        page,
        sort,
        roles,
        searchKeyword,
        isDeleteSuccess,
        location.state,
        token,
        type,
        count,
        sortType
      ]);
    
      useEffect(() => {
        if (isDeleteSuccess) {
          swal('User has been deleted!', {
            buttons: false,
            timer: 1500
          });
        }
    
        if (isDeleteError) {
          swal('User has been deleted');
        }
        resetDeleteUser();
      }, [isDeleteError, isDeleteSuccess, resetDeleteUser]);
    
      useEffect(() => {
        if (isChangeStatusSuccess) {
          swal(
            status === 'active'
              ? 'User has been activated'
              : 'User has been deactivated',
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


      const handleFormVisibilty = () => {
        setFormVisibilty(!formVisibility);
      };

      const handAddFormToggle = bool => {
        setIsAddForm(bool);
      };

      const getUserId = id => {
        setUserId(id);
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


    return <Layout title="Youtube">
        <MainSidebar/>
        <div className="main-content">
        <section className="section">
            <SectionHeader title="Youtube Management" />
            {!formVisibility ?<YouTubeListing handleFormVisibilty={handleFormVisibilty}
              youtube={data && data}
              total={data && data.total}
              handAddFormToggle={handAddFormToggle}
              getUserId={getUserId}
              isRequesting={isRequesting}
              // UserListing={UserListing}
              resetSingleUser={resetSingleUser}
              deleteUser={deleteUser}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
              page={page}
              count={count}
              getSearchKeyword={getSearchKeyword}
              changeStatus={changeStatus}
              getStatus={getStatus}
              toggleSort={toggleSort} />: <YouTubeForm handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              userId={userId}
              setReloadToggle={setReloadToggle}
              reloadToggle={reloadToggle}/>}
        </section>
        </div>
    </Layout>
}


const mapStateToProps = state => ({
    // data: state.youtube.data,
    isRequesting: state.user.isRequesting,
    isSuccess: state.user.isSuccess,
    isError: state.user.isError,
    isDeleteSuccess: state.deleteUser.isSuccess,
    isDeleteError: state.deleteUser.isError,
    isChangeStatusSuccess: state.status.isSuccess,
    isChangeStatusError: state.status.isError
  });
  
  export default connect(mapStateToProps, {
    youtube,
    resetSingleUser,
    deleteUser,
    resetDeleteUser,
    changeStatus,
    resetStatus
  })(withRouter(YouTubeManagement));
// export default YouTubeManagement;